export const typeDefs = `#graphql
  # Scalar Types
  scalar DateTime

  # Directives demonstration
  directive @auth(requires: Role = USER) on FIELD_DEFINITION
  directive @rateLimit(limit: Int!, duration: Int!) on FIELD_DEFINITION

  enum Role {
    USER
    ADMIN
  }

  enum PostStatus {
    DRAFT
    PUBLISHED
    ARCHIVED
  }

  # Interfaces - shared fields across types
  interface Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Object Types
  type User implements Node {
    id: ID!
    username: String!
    email: String!
    role: Role!
    posts: [Post!]!
    comments: [Comment!]!
    profile: UserProfile
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type UserProfile {
    bio: String
    avatar: String
    website: String
  }

  type Post implements Node {
    id: ID!
    title: String!
    content: String!
    status: PostStatus!
    author: User!
    comments: [Comment!]!
    tags: [String!]!
    viewCount: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Comment implements Node {
    id: ID!
    text: String!
    author: User!
    post: Post!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Input Types
  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    username: String
    email: String
    bio: String
    avatar: String
    website: String
  }

  input CreatePostInput {
    title: String!
    content: String!
    tags: [String!]
    status: PostStatus = DRAFT
  }

  input UpdatePostInput {
    title: String
    content: String
    tags: [String!]
    status: PostStatus
  }

  input CreateCommentInput {
    text: String!
    postId: ID!
  }

  # Pagination Types
  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type PostEdge {
    cursor: String!
    node: Post!
  }

  type PostConnection {
    edges: [PostEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  # Union Types - for error handling
  union AuthResult = AuthSuccess | AuthError

  type AuthSuccess {
    token: String!
    user: User!
  }

  type AuthError {
    message: String!
    code: String!
  }

  # Search Results Union
  union SearchResult = User | Post | Comment

  # Root Query Type
  type Query {
    # User queries
    me: User @auth
    user(id: ID!): User
    users(limit: Int = 10, offset: Int = 0): [User!]!

    # Post queries
    post(id: ID!): Post
    posts(
      first: Int
      after: String
      status: PostStatus
    ): PostConnection!

    # Search
    search(query: String!): [SearchResult!]!

    # Statistics
    stats: Stats!
  }

  type Stats {
    totalUsers: Int!
    totalPosts: Int!
    totalComments: Int!
  }

  # Root Mutation Type
  type Mutation {
    # Authentication
    register(input: CreateUserInput!): AuthResult!
    login(username: String!, password: String!): AuthResult!

    # User mutations
    updateUser(input: UpdateUserInput!): User! @auth
    deleteUser(id: ID!): Boolean! @auth(requires: ADMIN)

    # Post mutations
    createPost(input: CreatePostInput!): Post! @auth
    updatePost(id: ID!, input: UpdatePostInput!): Post! @auth
    deletePost(id: ID!): Boolean! @auth
    publishPost(id: ID!): Post! @auth

    # Comment mutations
    createComment(input: CreateCommentInput!): Comment! @auth
    deleteComment(id: ID!): Boolean! @auth
  }

  # Root Subscription Type
  type Subscription {
    # Real-time updates
    postCreated: Post!
    postUpdated(id: ID!): Post!
    commentAdded(postId: ID!): Comment!
    userJoined: User!
  }
`;
