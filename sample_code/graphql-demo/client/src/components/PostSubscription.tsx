import { useSubscription } from '@apollo/client';
import { POST_CREATED } from '../queries';
import { useState } from 'react';

/**
 * PostSubscription Component
 *
 * Demonstrates:
 * - useSubscription hook
 * - Real-time updates via WebSocket
 * - Subscription data handling
 * - Managing subscription lifecycle
 */

export function PostSubscription() {
  const [posts, setPosts] = useState<any[]>([]);

  /**
   * useSubscription hook
   *
   * Similar to useQuery, but for real-time data:
   * - Establishes WebSocket connection
   * - Listens for server-sent events
   * - Updates whenever server publishes data
   *
   * Returns:
   * - data: Latest subscription data
   * - loading: True until first message received
   * - error: Connection or subscription errors
   */
  const { data, loading, error } = useSubscription(POST_CREATED, {
    /**
     * onData callback
     * Called every time new data arrives
     */
    onData: ({ data }) => {
      if (data.data?.postCreated) {
        // Add new post to local state
        setPosts((prev) => [data.data.postCreated, ...prev]);
      }
    },

    /**
     * shouldResubscribe
     * Whether to resubscribe when variables change
     */
    shouldResubscribe: true,

    /**
     * onError callback
     * Handle subscription errors
     */
    // onError: (error) => {
    //   console.error('Subscription error:', error);
    // },

    /**
     * onComplete callback
     * Called when subscription closes
     */
    // onComplete: () => {
    //   console.log('Subscription completed');
    // },
  });

  if (loading) {
    return <div>Connecting to real-time updates...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Subscription error: {error.message}</p>
        <small>Make sure the WebSocket server is running</small>
      </div>
    );
  }

  return (
    <div>
      <h2>Real-Time Posts Feed</h2>
      <p>New posts will appear here automatically!</p>

      {posts.length === 0 ? (
        <div>
          <p>Waiting for new posts...</p>
          <small>Create a post in another tab to see it appear here!</small>
        </div>
      ) : (
        <div>
          <h3>Recent Posts ({posts.length})</h3>
          {posts.map((post) => (
            <article
              key={post.id}
              style={{
                border: '2px solid green',
                padding: '1rem',
                margin: '1rem 0',
                animation: 'slideIn 0.3s ease-out',
              }}
            >
              <h4>{post.title}</h4>
              <p>{post.content}</p>
              <small>
                By {post.author.username} | {new Date(post.createdAt).toLocaleString()}
              </small>
            </article>
          ))}
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Subscription Patterns:
 *
 * 1. Listen and Display (this component):
 *    - Just show new data as it arrives
 *    - Good for: notifications, live feeds
 *
 * 2. Update Cache:
 *    - Write subscription data to Apollo cache
 *    - Other components automatically update
 *    - Good for: collaborative editing
 *
 *    Example:
 *    useSubscription(POST_CREATED, {
 *      onData: ({ client, data }) => {
 *        const newPost = data.data?.postCreated;
 *        if (newPost) {
 *          client.cache.modify({
 *            fields: {
 *              posts(existing = []) {
 *                return [newPost, ...existing];
 *              }
 *            }
 *          });
 *        }
 *      }
 *    });
 *
 * 3. Trigger Refetch:
 *    - Refetch related queries when subscription fires
 *    - Good for: complex updates
 *
 * 4. Toast Notification:
 *    - Show notification when data arrives
 *    - Don't update UI automatically
 *    - Good for: optional updates, user choice
 */

/**
 * Advanced: Filtered Subscriptions
 *
 * Subscribe to specific events:
 *
 * useSubscription(POST_UPDATED, {
 *   variables: { id: postId },
 *   skip: !postId, // Only subscribe when postId exists
 * });
 */

/**
 * Cleanup:
 *
 * Subscriptions are automatically cleaned up when component unmounts
 * No manual cleanup needed!
 */
