# GraphQL Demo Project

Comprehensive GraphQL demonstration covering core concepts and best practices.

## Project Structure

```
graphql-demo/
├── server/           # Apollo Server with TypeScript
│   ├── src/
│   │   ├── schema/   # Type definitions
│   │   ├── resolvers/ # Resolver functions
│   │   ├── models/   # Data models
│   │   ├── utils/    # Authentication utilities
│   │   └── index.ts  # Server entry
│   ├── examples/     # Example GraphQL queries
│   └── package.json
├── client/           # React + Apollo Client
│   ├── src/
│   │   ├── components/
│   │   ├── queries/
│   │   └── App.tsx
│   └── package.json
└── README.md
```

## Features Demonstrated

### Basic Concepts
- ✅ Queries (single and list)
- ✅ Mutations (create, update, delete)
- ✅ Subscriptions (real-time updates)
- ✅ Type system (Object types, Scalar types)
- ✅ Schema definition

### Intermediate Concepts
- ✅ Resolvers with all 4 parameters
- ✅ Context management
- ✅ Input types
- ✅ Fragments
- ✅ Directives (@deprecated, @include, @skip)
- ✅ Interfaces and Unions

### Advanced Concepts
- ✅ Nested resolvers with direct data access
- ✅ Authentication & Authorization
- ✅ Error handling
- ✅ Pagination (offset and cursor-based)
- ✅ Subscriptions with WebSocket

## Getting Started

### Server Setup

```bash
cd server
npm install
npm run dev
```

Server runs on http://localhost:4000
Apollo Studio: http://localhost:4000/graphql

### Client Setup

```bash
cd client
npm install
npm run dev
```

Client runs on http://localhost:5173

## Learning Path

### 1. Basic Queries (examples/01-basic-queries.graphql)
Start with simple queries to fetch data

### 2. Mutations (examples/02-mutations.graphql)
Learn to create, update, and delete data

### 3. Subscriptions (examples/03-subscriptions.graphql)
Real-time updates with WebSocket

### 4. Advanced Patterns (examples/04-advanced.graphql)
Fragments, directives, interfaces, unions, and pagination

## Example Queries

### Fetch Users
```graphql
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
```

### Create User
```graphql
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    username
    email
  }
}
```

### Subscribe to New Posts
```graphql
subscription OnNewPost {
  newPost {
    id
    title
    author {
      username
    }
  }
}
```

## Common Patterns

### Error Handling
```graphql
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    ... on LoginSuccess {
      token
      user {
        id
        username
      }
    }
    ... on LoginError {
      message
    }
  }
}
```

### Pagination
```graphql
query GetPosts($first: Int!, $after: String) {
  posts(first: $first, after: $after) {
    edges {
      node {
        id
        title
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

## Key Implementation Details

### Direct Data Access
This demo uses direct data access patterns (Array.filter(), Array.find()) for educational simplicity. Nested resolvers fetch related data directly from in-memory arrays:

```javascript
User: {
  posts: (parent) => posts.filter(post => post.authorId === parent.id)
}
```

### Production Considerations
For production applications with databases:
- Consider implementing batching and caching strategies (like DataLoader)
- Optimize database queries to prevent N+1 problems
- Add query complexity limits and depth restrictions
- Implement proper connection pooling

## Resources

- [Apollo Server Documentation](https://www.apollographql.com/docs/apollo-server/)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [GraphQL Specification](https://spec.graphql.org/)
- [GraphQL Best Practices](https://graphql.org/learn/best-practices/)
