import { gql } from '@apollo/client';

/**
 * GraphQL Queries
 *
 * Best practices:
 * 1. Define queries in separate files
 * 2. Use meaningful names
 * 3. Add fragments for reusable fields
 * 4. Add comments for documentation
 */

// =====================
// FRAGMENTS
// =====================

export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    username
    email
    createdAt
  }
`;

export const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    title
    content
    status
    tags
    viewCount
    createdAt
    author {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;

// =====================
// QUERIES
// =====================

/**
 * Get all users
 */
export const GET_USERS = gql`
  query GetUsers($limit: Int, $offset: Int) {
    users(limit: $limit, offset: $offset) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;

/**
 * Get single user by ID with their posts
 */
export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      ...UserFields
      profile {
        bio
        avatar
        website
      }
      posts {
        ...PostFields
      }
    }
  }
  ${USER_FIELDS}
  ${POST_FIELDS}
`;

/**
 * Get posts with cursor-based pagination
 */
export const GET_POSTS = gql`
  query GetPosts($first: Int!, $after: String, $status: PostStatus) {
    posts(first: $first, after: $after, status: $status) {
      edges {
        cursor
        node {
          ...PostFields
          comments {
            id
            text
            author {
              username
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
      }
      totalCount
    }
  }
  ${POST_FIELDS}
`;

/**
 * Get single post with comments
 */
export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      ...PostFields
      comments {
        id
        text
        createdAt
        author {
          ...UserFields
        }
      }
    }
  }
  ${POST_FIELDS}
  ${USER_FIELDS}
`;

/**
 * Search across users, posts, and comments
 */
export const SEARCH = gql`
  query Search($query: String!) {
    search(query: $query) {
      __typename
      ... on User {
        id
        username
        email
      }
      ... on Post {
        id
        title
        content
      }
      ... on Comment {
        id
        text
      }
    }
  }
`;

/**
 * Get statistics
 */
export const GET_STATS = gql`
  query GetStats {
    stats {
      totalUsers
      totalPosts
      totalComments
    }
  }
`;

// =====================
// MUTATIONS
// =====================

/**
 * Create a new post
 */
export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      ...PostFields
    }
  }
  ${POST_FIELDS}
`;

/**
 * Update a post
 */
export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      ...PostFields
    }
  }
  ${POST_FIELDS}
`;

/**
 * Delete a post
 */
export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

/**
 * Create a comment
 */
export const CREATE_COMMENT = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      text
      createdAt
      author {
        ...UserFields
      }
    }
  }
  ${USER_FIELDS}
`;

// =====================
// SUBSCRIPTIONS
// =====================

/**
 * Subscribe to new posts
 */
export const POST_CREATED = gql`
  subscription OnPostCreated {
    postCreated {
      ...PostFields
    }
  }
  ${POST_FIELDS}
`;

/**
 * Subscribe to post updates
 */
export const POST_UPDATED = gql`
  subscription OnPostUpdated($id: ID!) {
    postUpdated(id: $id) {
      ...PostFields
    }
  }
  ${POST_FIELDS}
`;

/**
 * Subscribe to new comments
 */
export const COMMENT_ADDED = gql`
  subscription OnCommentAdded($postId: ID!) {
    commentAdded(postId: $postId) {
      id
      text
      createdAt
      author {
        ...UserFields
      }
    }
  }
  ${USER_FIELDS}
`;

