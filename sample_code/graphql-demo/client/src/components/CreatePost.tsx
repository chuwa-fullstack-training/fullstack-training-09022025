import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST, GET_POSTS } from '../queries';

/**
 * CreatePost Component
 *
 * Demonstrates:
 * - useMutation hook
 * - Form handling
 * - Cache updates after mutation
 * - Optimistic UI (optional)
 * - Error handling
 */

export function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  /**
   * useMutation hook
   *
   * Returns:
   * - mutation function (to trigger the mutation)
   * - data, loading, error (like useQuery)
   * - reset function (to clear mutation state)
   */
  const [createPost, { loading, error, data }] = useMutation(CREATE_POST, {
    /**
     * Option 1: Refetch queries after mutation
     *
     * Simple but less efficient (refetches entire query)
     */
    refetchQueries: [
      {
        query: GET_POSTS,
        variables: { first: 5, status: 'PUBLISHED' },
      },
    ],

    /**
     * Option 2: Update cache manually (more efficient)
     *
     * This is commented out because we're using refetchQueries above
     * In production, prefer this approach for better performance
     */
    // update(cache, { data: { createPost } }) {
    //   // Read existing posts from cache
    //   const existingPosts: any = cache.readQuery({
    //     query: GET_POSTS,
    //     variables: { first: 5, status: 'PUBLISHED' },
    //   });
    //
    //   if (existingPosts && createPost) {
    //     // Write updated posts to cache
    //     cache.writeQuery({
    //       query: GET_POSTS,
    //       variables: { first: 5, status: 'PUBLISHED' },
    //       data: {
    //         posts: {
    //           ...existingPosts.posts,
    //           edges: [
    //             {
    //               __typename: 'PostEdge',
    //               cursor: createPost.id,
    //               node: createPost,
    //             },
    //             ...existingPosts.posts.edges,
    //           ],
    //           totalCount: existingPosts.posts.totalCount + 1,
    //         },
    //       },
    //     });
    //   }
    // },

    /**
     * Option 3: Optimistic response (instant UI update)
     *
     * Shows the expected result immediately, before server responds
     * If mutation fails, Apollo automatically rolls back
     */
    // optimisticResponse: {
    //   createPost: {
    //     __typename: 'Post',
    //     id: 'temp-id',
    //     title,
    //     content,
    //     status: 'DRAFT',
    //     tags: tags.split(',').map(t => t.trim()),
    //     viewCount: 0,
    //     createdAt: new Date().toISOString(),
    //     author: {
    //       __typename: 'User',
    //       id: 'current-user-id',
    //       username: 'You',
    //       email: '',
    //       createdAt: new Date().toISOString(),
    //     },
    //   },
    // },

    /**
     * Handle errors
     */
    onError: (error) => {
      console.error('Mutation error:', error);
    },

    /**
     * Handle success
     */
    onCompleted: (data) => {
      console.log('Post created:', data);
      // Clear form
      setTitle('');
      setContent('');
      setTags('');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (!title || !content) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Trigger mutation
      await createPost({
        variables: {
          input: {
            title,
            content,
            tags: tags.split(',').map(t => t.trim()),
            status: 'PUBLISHED',
          },
        },
      });
    } catch (err) {
      // Error is already handled by onError callback
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Create New Post</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
          </label>
        </div>

        <div>
          <label>
            Content:
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              disabled={loading}
            />
          </label>
        </div>

        <div>
          <label>
            Tags (comma-separated):
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="graphql, tutorial, react"
              disabled={loading}
            />
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>

      {/* Show error */}
      {error && (
        <div style={{ color: 'red' }}>
          Error: {error.message}
        </div>
      )}

      {/* Show success */}
      {data && (
        <div style={{ color: 'green' }}>
          Post created successfully! ID: {data.createPost.id}
        </div>
      )}
    </div>
  );
}

/**
 * Mutation Best Practices:
 *
 * 1. Cache Updates:
 *    - Use refetchQueries for simplicity
 *    - Use update() for efficiency
 *    - Use optimisticResponse for instant UI
 *
 * 2. Error Handling:
 *    - Always handle errors
 *    - Show user-friendly messages
 *    - Log details for debugging
 *
 * 3. Loading States:
 *    - Disable form during mutation
 *    - Show loading indicator
 *    - Prevent double-submission
 *
 * 4. Success Feedback:
 *    - Clear form
 *    - Show success message
 *    - Redirect if needed
 */
