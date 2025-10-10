import { useQuery } from '@apollo/client';
import { GET_USERS } from '../queries';

/**
 * UserList Component
 *
 * Demonstrates:
 * - useQuery hook for fetching data
 * - Loading and error states
 * - Query variables
 * - Destructuring query results
 */

export function UserList() {
    /**
     * useQuery hook
     *
     * Returns an object with:
     * - loading: boolean - true while fetching
     * - error: ApolloError | undefined - error if request failed
     * - data: query result data
     * - refetch: function to manually refetch
     * - networkStatus: detailed loading state
     */
    const { loading, error, data, refetch } = useQuery(GET_USERS, {
        variables: {
            limit: 10,
            offset: 0
        },
        // Optional: polling interval (refetch every N ms)
        pollInterval: 5000

        // Optional: don't fetch on mount, wait for manual trigger
        // skip: true,
    });

    // Handle loading state
    if (loading) {
        return <div>Loading users...</div>;
    }

    // Handle error state
    if (error) {
        return (
            <div>
                <p>Error loading users: {error.message}</p>
                <button onClick={() => refetch()}>Retry</button>
            </div>
        );
    }

    // Handle empty data
    if (!data || !data.users) {
        return <div>No users found</div>;
    }

    return (
        <div>
            <h2>Users ({data.users.length})</h2>
            <button onClick={() => refetch()}>Refresh</button>

            <ul>
                {data.users.map((user: any) => (
                    <li key={user.id}>
                        <strong>{user.username}</strong> - {user.email}
                        <br />
                        <small>
                            Joined:{' '}
                            {new Date(user.createdAt).toLocaleDateString()}
                        </small>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/**
 * Tips:
 *
 * 1. Handle all three states: loading, error, data
 * 2. Use variables for dynamic queries
 * 3. Destructure only what you need from useQuery
 * 4. Consider using skip for conditional queries
 * 5. Use pollInterval for real-time-ish data (or use subscriptions!)
 */
