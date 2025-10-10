import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../queries';
import { useState } from 'react';

/**
 * PostList Component with Pagination
 *
 * Demonstrates:
 * - Cursor-based pagination
 * - fetchMore for loading more data
 * - Query variables
 * - Filter by status
 */

export function PostList() {
  const [status, setStatus] = useState<'PUBLISHED' | 'DRAFT' | null>('PUBLISHED');

  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      first: 5,
      after: null,
      status,
    },
  });

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.posts) return <div>No posts found</div>;

  const { edges, pageInfo, totalCount } = data.posts;

  /**
   * Load more posts using cursor-based pagination
   *
   * fetchMore:
   * 1. Fetches additional data
   * 2. Merges with existing cache
   * 3. Updates the component
   */
  const loadMore = () => {
    fetchMore({
      variables: {
        after: pageInfo.endCursor, // Use cursor from last item
      },
      // This function tells Apollo how to merge new data
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          posts: {
            ...fetchMoreResult.posts,
            edges: [...prev.posts.edges, ...fetchMoreResult.posts.edges],
          },
        };
      },
    });
  };

  return (
    <div>
      <h2>Posts (Total: {totalCount})</h2>

      {/* Filter controls */}
      <div>
        <button onClick={() => setStatus('PUBLISHED')}>Published</button>
        <button onClick={() => setStatus('DRAFT')}>Drafts</button>
        <button onClick={() => setStatus(null)}>All</button>
      </div>

      {/* Post list */}
      <div>
        {edges.map(({ node }: any) => (
          <article key={node.id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
            <h3>{node.title}</h3>
            <p>{node.content.substring(0, 150)}...</p>
            <div>
              <small>
                By {node.author.username} | {node.status} | Views: {node.viewCount}
              </small>
            </div>
            <div>
              Tags: {node.tags.join(', ')}
            </div>
            <div>
              Comments: {node.comments.length}
            </div>
          </article>
        ))}
      </div>

      {/* Load more button */}
      {pageInfo.hasNextPage && (
        <button onClick={loadMore} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}

/**
 * Pagination Patterns:
 *
 * 1. Offset-based (simple):
 *    - Variables: limit, offset
 *    - Good for: Small datasets, page numbers
 *    - Bad for: Large datasets, items can shift
 *
 * 2. Cursor-based (Relay-style):
 *    - Variables: first, after (or last, before)
 *    - Good for: Large datasets, stable pagination
 *    - Bad for: Jumping to specific pages
 *
 * 3. Infinite scroll:
 *    - Use fetchMore with cursor-based
 *    - Detect scroll position
 *    - Load automatically
 */
