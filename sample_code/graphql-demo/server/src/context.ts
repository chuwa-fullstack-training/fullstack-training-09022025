import { User } from './models/data.js';
import { PubSub } from 'graphql-subscriptions';

/**
 * GraphQL Context
 *
 * The context is an object that's accessible in all resolvers
 * It's created for each request and can contain:
 * - Current user (from authentication)
 * - Database connections
 * - PubSub (for subscriptions)
 * - Any other per-request data
 */

export interface Context {
  // Current authenticated user (null if not authenticated)
  currentUser: User | null;

  // PubSub for real-time subscriptions
  pubsub: PubSub;

  // Request headers (for extracting auth token)
  token?: string;
}

// Create a single PubSub instance to share across all requests
export const pubsub = new PubSub();

/**
 * Create context for each GraphQL request
 *
 * This function is called for every GraphQL operation
 * It's where you typically:
 * 1. Extract authentication token from headers
 * 2. Verify token and fetch user
 * 3. Add any other request-specific data
 */
export const createContext = async ({
  req,
  connectionParams,
}: {
  req?: any;
  connectionParams?: any;
}): Promise<Context> => {
  // For HTTP requests
  let token: string | undefined;
  if (req?.headers?.authorization) {
    token = req.headers.authorization.replace('Bearer ', '');
  }

  // For WebSocket connections (subscriptions)
  if (connectionParams?.authorization) {
    token = connectionParams.authorization.replace('Bearer ', '');
  }

  // In a real app, you would verify the token and fetch the user here
  // For demo purposes, we'll keep it simple
  let currentUser: User | null = null;

  // TODO: Add token verification and user fetching
  // if (token) {
  //   const payload = verifyToken(token);
  //   currentUser = await getUserById(payload.userId);
  // }

  return {
    currentUser,
    pubsub,
    token,
  };
};
