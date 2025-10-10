import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import cors from 'cors';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './resolvers/index.js';
import { createContext } from './context.js';

/**
 * Apollo Server Setup with Subscriptions
 *
 * This setup includes:
 * 1. HTTP server for queries and mutations
 * 2. WebSocket server for subscriptions
 * 3. Express middleware integration
 * 4. CORS configuration
 * 5. GraphQL Playground
 */

const PORT = process.env.PORT || 4000;

async function startServer() {
  // Create Express app
  const app = express();

  // Create HTTP server
  const httpServer = createServer(app);

  // Create executable schema
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Create WebSocket server for subscriptions
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  // Set up WebSocket server with graphql-ws
  const serverCleanup = useServer(
    {
      schema,
      context: async (ctx) => {
        // Context for WebSocket connections (subscriptions)
        return createContext({
          connectionParams: ctx.connectionParams,
        });
      },
    },
    wsServer
  );

  // Create Apollo Server
  const server = new ApolloServer({
    schema,
    plugins: [
      // Proper shutdown for the HTTP server
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
    // Enable introspection and playground in development
    introspection: true,
  });

  // Start Apollo Server
  await server.start();

  // Apply middleware
  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: ['http://localhost:5173', 'http://localhost:3000'],
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        // Context for HTTP requests (queries and mutations)
        return createContext({ req });
      },
    })
  );

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Start the server
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`🔔 Subscriptions ready at ws://localhost:${PORT}/graphql`);
    console.log(`\n📚 Available operations:`);
    console.log(`   - Queries: users, user, posts, post, search, stats`);
    console.log(`   - Mutations: register, login, createPost, createComment`);
    console.log(`   - Subscriptions: postCreated, commentAdded, userJoined`);
    console.log(`\n💡 Try these queries in Apollo Studio:`);
    console.log(`
    # Query example
    query GetUsers {
      users {
        id
        username
        email
        posts {
          id
          title
        }
      }
    }

    # Mutation example
    mutation Register {
      register(input: {
        username: "testuser"
        email: "test@example.com"
        password: "password123"
      }) {
        ... on AuthSuccess {
          token
          user {
            id
            username
          }
        }
        ... on AuthError {
          message
          code
        }
      }
    }

    # Subscription example
    subscription OnNewPost {
      postCreated {
        id
        title
        author {
          username
        }
      }
    }
    `);
  });
}

// Start the server
startServer().catch((error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});
