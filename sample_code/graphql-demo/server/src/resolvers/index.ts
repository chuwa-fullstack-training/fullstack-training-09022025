import { GraphQLError } from 'graphql';
import { users, posts, comments, generateId } from '../models/data.js';
import { hashPassword, comparePassword, generateToken } from '../utils/auth.js';
import { Context } from '../context.js';

/**
 * GraphQL Resolvers
 *
 * Resolvers are functions that resolve a value for a field in your schema.
 * Each resolver function receives four arguments:
 *
 * 1. parent: The result from the parent resolver (useful for nested resolvers)
 * 2. args: Arguments provided to the field in the query
 * 3. context: Shared context (user, database, pubsub, etc.)
 * 4. info: Information about the execution state (rarely used)
 */

export const resolvers = {
  // ====================
  // CUSTOM SCALARS
  // ====================
  DateTime: {
    serialize(value: Date) {
      return value.toISOString(); // Send to client
    },
    parseValue(value: string) {
      return new Date(value); // Receive from client
    },
  },

  // ====================
  // INTERFACES
  // ====================
  Node: {
    __resolveType(obj: any) {
      if (obj.username) return 'User';
      if (obj.title) return 'Post';
      if (obj.text) return 'Comment';
      return null;
    },
  },

  // ====================
  // UNIONS
  // ====================
  AuthResult: {
    __resolveType(obj: any) {
      if (obj.token) return 'AuthSuccess';
      if (obj.message) return 'AuthError';
      return null;
    },
  },

  SearchResult: {
    __resolveType(obj: any) {
      if (obj.username) return 'User';
      if (obj.title) return 'Post';
      if (obj.text) return 'Comment';
      return null;
    },
  },

  // ====================
  // QUERY RESOLVERS
  // ====================
  Query: {
    /**
     * Get current authenticated user
     * Demonstrates: Authentication, Context usage
     */
    me: (_parent, _args, context: Context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }
      return context.currentUser;
    },

    /**
     * Get a single user by ID
     * Demonstrates: Direct data access
     */
    user: (_parent, { id }, _context: Context) => {
      const user = users.find(u => u.id === id);

      if (!user) {
        throw new GraphQLError('User not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      return user;
    },

    /**
     * Get all users with pagination
     * Demonstrates: Pagination, Arguments
     */
    users: (_parent, { limit, offset }, _context: Context) => {
      return users.slice(offset, offset + limit);
    },

    /**
     * Get a single post by ID
     * Demonstrates: Simple resolver with argument
     */
    post: (_parent, { id }, _context: Context) => {
      const post = posts.find(p => p.id === id);

      if (!post) {
        throw new GraphQLError('Post not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      return post;
    },

    /**
     * Get posts with cursor-based pagination
     * Demonstrates: Relay-style pagination, Filtering
     */
    posts: (_parent, { first = 10, after, status }, _context: Context) => {
      let filteredPosts = status
        ? posts.filter(p => p.status === status)
        : posts;

      // Sort by creation date (newest first)
      filteredPosts = filteredPosts.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );

      // Handle cursor-based pagination
      let startIndex = 0;
      if (after) {
        const cursorIndex = filteredPosts.findIndex(p => p.id === after);
        startIndex = cursorIndex + 1;
      }

      const paginatedPosts = filteredPosts.slice(startIndex, startIndex + first);
      const hasNextPage = startIndex + first < filteredPosts.length;

      return {
        edges: paginatedPosts.map(post => ({
          cursor: post.id,
          node: post,
        })),
        pageInfo: {
          hasNextPage,
          hasPreviousPage: startIndex > 0,
          startCursor: paginatedPosts[0]?.id,
          endCursor: paginatedPosts[paginatedPosts.length - 1]?.id,
        },
        totalCount: filteredPosts.length,
      };
    },

    /**
     * Search across multiple types
     * Demonstrates: Union types, Complex queries
     */
    search: (_parent, { query }, _context: Context) => {
      const lowercaseQuery = query.toLowerCase();
      const results: any[] = [];

      // Search users
      users.forEach(user => {
        if (
          user.username.toLowerCase().includes(lowercaseQuery) ||
          user.email.toLowerCase().includes(lowercaseQuery)
        ) {
          results.push(user);
        }
      });

      // Search posts
      posts.forEach(post => {
        if (
          post.title.toLowerCase().includes(lowercaseQuery) ||
          post.content.toLowerCase().includes(lowercaseQuery)
        ) {
          results.push(post);
        }
      });

      // Search comments
      comments.forEach(comment => {
        if (comment.text.toLowerCase().includes(lowercaseQuery)) {
          results.push(comment);
        }
      });

      return results;
    },

    /**
     * Get statistics
     * Demonstrates: Computed fields
     */
    stats: () => ({
      totalUsers: users.length,
      totalPosts: posts.length,
      totalComments: comments.length,
    }),
  },

  // ====================
  // MUTATION RESOLVERS
  // ====================
  Mutation: {
    /**
     * Register a new user
     * Demonstrates: Input types, Error handling, Union return types
     */
    register: async (_parent, { input }, context: Context) => {
      // Validate input
      if (input.password.length < 6) {
        return {
          message: 'Password must be at least 6 characters',
          code: 'INVALID_PASSWORD',
        };
      }

      // Check if user exists
      const existingUser = users.find(
        u => u.username === input.username || u.email === input.email
      );

      if (existingUser) {
        return {
          message: 'Username or email already exists',
          code: 'USER_EXISTS',
        };
      }

      // Create new user
      const hashedPassword = await hashPassword(input.password);
      const newUser = {
        id: generateId('user'),
        username: input.username,
        email: input.email,
        password: hashedPassword,
        role: 'USER' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      users.push(newUser);

      // Publish subscription event
      context.pubsub.publish('USER_JOINED', { userJoined: newUser });

      // Generate token
      const token = generateToken(newUser);

      return {
        token,
        user: newUser,
      };
    },

    /**
     * Login user
     * Demonstrates: Authentication, Union return types
     */
    login: async (_parent, { username, password }, _context: Context) => {
      const user = users.find(u => u.username === username);

      if (!user) {
        return {
          message: 'Invalid username or password',
          code: 'INVALID_CREDENTIALS',
        };
      }

      const isValid = await comparePassword(password, user.password);

      if (!isValid) {
        return {
          message: 'Invalid username or password',
          code: 'INVALID_CREDENTIALS',
        };
      }

      const token = generateToken(user);

      return {
        token,
        user,
      };
    },

    /**
     * Update user profile
     * Demonstrates: Authentication requirement, Partial updates
     */
    updateUser: async (_parent, { input }, context: Context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const user = users.find(u => u.id === context.currentUser!.id);
      if (!user) {
        throw new GraphQLError('User not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      // Update only provided fields
      if (input.username) user.username = input.username;
      if (input.email) user.email = input.email;
      if (input.bio !== undefined) user.bio = input.bio;
      if (input.avatar) user.avatar = input.avatar;
      if (input.website) user.website = input.website;
      user.updatedAt = new Date();

      return user;
    },

    /**
     * Delete user (admin only)
     * Demonstrates: Role-based authorization
     */
    deleteUser: async (_parent, { id }, context: Context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      if (context.currentUser.role !== 'ADMIN') {
        throw new GraphQLError('Admin access required', {
          extensions: { code: 'FORBIDDEN' },
        });
      }

      const userIndex = users.findIndex(u => u.id === id);
      if (userIndex === -1) {
        throw new GraphQLError('User not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      users.splice(userIndex, 1);
      return true;
    },

    /**
     * Create a new post
     * Demonstrates: Authentication, Default values
     */
    createPost: async (_parent, { input }, context: Context) => {
      // if (!context.currentUser) {
      //   throw new GraphQLError('Not authenticated', {
      //     extensions: { code: 'UNAUTHENTICATED' },
      //   });
      // }

      const newPost = {
        id: generateId('post'),
        title: input.title,
        content: input.content,
        status: input.status || 'DRAFT',
        authorId: "1",
        tags: input.tags || [],
        viewCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      posts.push(newPost);

      // Publish subscription event
      context.pubsub.publish('POST_CREATED', { postCreated: newPost });

      return newPost;
    },

    /**
     * Update a post
     * Demonstrates: Authorization (owner check)
     */
    updatePost: async (_parent, { id, input }, context: Context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const post = posts.find(p => p.id === id);
      if (!post) {
        throw new GraphQLError('Post not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      // Check if user owns the post
      if (post.authorId !== context.currentUser.id && context.currentUser.role !== 'ADMIN') {
        throw new GraphQLError('Not authorized to update this post', {
          extensions: { code: 'FORBIDDEN' },
        });
      }

      if (input.title) post.title = input.title;
      if (input.content) post.content = input.content;
      if (input.status) post.status = input.status;
      if (input.tags) post.tags = input.tags;
      post.updatedAt = new Date();

      // Publish subscription event
      context.pubsub.publish(`POST_UPDATED_${id}`, { postUpdated: post });

      return post;
    },

    /**
     * Delete a post
     * Demonstrates: Authorization, Boolean return
     */
    deletePost: async (_parent, { id }, context: Context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const postIndex = posts.findIndex(p => p.id === id);
      if (postIndex === -1) {
        throw new GraphQLError('Post not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      const post = posts[postIndex];
      if (post.authorId !== context.currentUser.id && context.currentUser.role !== 'ADMIN') {
        throw new GraphQLError('Not authorized to delete this post', {
          extensions: { code: 'FORBIDDEN' },
        });
      }

      posts.splice(postIndex, 1);
      return true;
    },

    /**
     * Publish a post
     * Demonstrates: State transitions
     */
    publishPost: async (_parent, { id }, context: Context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const post = posts.find(p => p.id === id);
      if (!post) {
        throw new GraphQLError('Post not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      if (post.authorId !== context.currentUser.id) {
        throw new GraphQLError('Not authorized to publish this post', {
          extensions: { code: 'FORBIDDEN' },
        });
      }

      post.status = 'PUBLISHED';
      post.updatedAt = new Date();

      return post;
    },

    /**
     * Create a comment
     * Demonstrates: Nested relationships
     */
    createComment: async (_parent, { input }, context: Context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const post = posts.find(p => p.id === input.postId);
      if (!post) {
        throw new GraphQLError('Post not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      const newComment = {
        id: generateId('comment'),
        text: input.text,
        authorId: context.currentUser.id,
        postId: input.postId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      comments.push(newComment);

      // Publish subscription event
      context.pubsub.publish(`COMMENT_ADDED_${input.postId}`, {
        commentAdded: newComment,
      });

      return newComment;
    },

    /**
     * Delete a comment
     */
    deleteComment: async (_parent, { id }, context: Context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const commentIndex = comments.findIndex(c => c.id === id);
      if (commentIndex === -1) {
        throw new GraphQLError('Comment not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      const comment = comments[commentIndex];
      if (comment.authorId !== context.currentUser.id && context.currentUser.role !== 'ADMIN') {
        throw new GraphQLError('Not authorized to delete this comment', {
          extensions: { code: 'FORBIDDEN' },
        });
      }

      comments.splice(commentIndex, 1);
      return true;
    },
  },

  // ====================
  // SUBSCRIPTION RESOLVERS
  // ====================
  Subscription: {
    /**
     * Subscribe to new posts
     * Demonstrates: Real-time updates with PubSub
     */
    postCreated: {
      subscribe: (_parent, _args, context: Context) => {
        return context.pubsub.asyncIterator(['POST_CREATED']);
      },
    },

    /**
     * Subscribe to post updates
     * Demonstrates: Filtered subscriptions
     */
    postUpdated: {
      subscribe: (_parent, { id }, context: Context) => {
        return context.pubsub.asyncIterator([`POST_UPDATED_${id}`]);
      },
    },

    /**
     * Subscribe to new comments on a post
     * Demonstrates: Subscription with arguments
     */
    commentAdded: {
      subscribe: (_parent, { postId }, context: Context) => {
        return context.pubsub.asyncIterator([`COMMENT_ADDED_${postId}`]);
      },
    },

    /**
     * Subscribe to new users joining
     */
    userJoined: {
      subscribe: (_parent, _args, context: Context) => {
        return context.pubsub.asyncIterator(['USER_JOINED']);
      },
    },
  },

  // ====================
  // TYPE RESOLVERS (Nested Fields)
  // ====================

  /**
   * User type resolvers
   * These resolve nested fields on the User type
   */
  User: {
    /**
     * Get user's posts
     * Demonstrates: Direct filtering from data array
     */
    posts: (parent) => {
      return posts.filter(post => post.authorId === parent.id);
    },

    /**
     * Get user's comments
     * Demonstrates: Direct filtering
     */
    comments: (parent) => {
      return comments.filter(comment => comment.authorId === parent.id);
    },

    /**
     * Get user profile
     * Demonstrates: Computed/virtual fields
     */
    profile: (parent) => {
      return {
        bio: parent.bio,
        avatar: parent.avatar,
        website: parent.website,
      };
    },
  },

  /**
   * Post type resolvers
   */
  Post: {
    /**
     * Get post's author
     * Demonstrates: Direct data access
     */
    author: (parent) => {
      const author = users.find(user => user.id === parent.authorId);
      if (!author) {
        throw new GraphQLError('Author not found');
      }
      return author;
    },

    /**
     * Get post's comments
     * Demonstrates: Direct filtering for one-to-many relationship
     */
    comments: (parent) => {
      return comments.filter(comment => comment.postId === parent.id);
    },
  },

  /**
   * Comment type resolvers
   */
  Comment: {
    /**
     * Get comment's author
     */
    author: (parent) => {
      const author = users.find(user => user.id === parent.authorId);
      if (!author) {
        throw new GraphQLError('Author not found');
      }
      return author;
    },

    /**
     * Get comment's post
     */
    post: (parent) => {
      const post = posts.find(p => p.id === parent.postId);
      if (!post) {
        throw new GraphQLError('Post not found');
      }
      return post;
    },
  },
};
