import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

/**
 * Apollo Client Setup
 *
 * Apollo Client is a comprehensive state management library for JavaScript
 * that enables you to manage both local and remote data with GraphQL.
 *
 * Key features:
 * 1. Declarative data fetching
 * 2. Intelligent caching
 * 3. Real-time subscriptions
 * 4. Local state management
 */

// HTTP link for queries and mutations
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include', // Include cookies
});

// WebSocket link for subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/graphql',
  })
);

/**
 * Split link: Use WebSocket for subscriptions, HTTP for queries/mutations
 *
 * This function checks if the operation is a subscription:
 * - If yes → use WebSocket link
 * - If no → use HTTP link
 */
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,    // if subscription
  httpLink   // if query or mutation
);

/**
 * Create Apollo Client instance
 */
export const client = new ApolloClient({
  link: splitLink,

  /**
   * Cache configuration
   * InMemoryCache stores query results for fast retrieval
   * It normalizes data by ID for efficient updates
   */
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Pagination handling for posts
          posts: {
            // Cache separately by status to prevent filter conflicts
            keyArgs: ['status'],

            merge(existing, incoming, { args }) {
              // If no existing data, return incoming data
              if (!existing) return incoming;

              // If 'after' cursor is null/undefined, this is a fresh query (filter change)
              // Replace existing data instead of appending
              if (!args?.after) {
                return incoming;
              }

              // If 'after' cursor exists, this is pagination (fetchMore)
              // Append new edges to existing edges
              const existingEdges = existing.edges || [];
              const incomingEdges = incoming.edges || [];

              return {
                ...incoming,
                edges: [...existingEdges, ...incomingEdges],
              };
            },
          },
        },
      },
    },
  }),

  // Enable dev tools
  connectToDevTools: true,

  // Default options for queries
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network', // Show cached data while fetching
      errorPolicy: 'all',               // Return both data and errors
    },
    query: {
      fetchPolicy: 'network-only',      // Always fetch fresh data
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

/**
 * Fetch Policies Explained:
 *
 * cache-first: Use cache if available, otherwise fetch (default)
 * cache-and-network: Use cache immediately, but also fetch and update
 * network-only: Always fetch from network, ignore cache
 * cache-only: Never fetch from network, use cache or error
 * no-cache: Always fetch, but don't store in cache
 */
