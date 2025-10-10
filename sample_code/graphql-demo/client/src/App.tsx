import { UserList } from './components/UserList';
import { PostList } from './components/PostList';
import { CreatePost } from './components/CreatePost';
import { PostSubscription } from './components/PostSubscription';
import './App.css';

/**
 * Main App Component
 *
 * Demonstrates a complete GraphQL application with:
 * - Queries (UserList, PostList)
 * - Mutations (CreatePost)
 * - Subscriptions (PostSubscription)
 */

function App() {
    return (
        <div className="App">
            <header>
                <h1>GraphQL Demo with Apollo Client</h1>
                <p>
                    A complete example covering queries, mutations, and
                    subscriptions
                </p>
            </header>

            <main>
                {/* Section 1: Queries */}
                <section className="section">
                    <h2>📚 Queries</h2>
                    <p>Fetch data from the server</p>

                    <div className="grid">
                        <div className="card">
                            <UserList />
                        </div>

                        <div className="card">
                            <PostList />
                        </div>
                    </div>
                </section>

                {/* Section 2: Mutations */}
                <section className="section">
                    <h2>✏️ Mutations</h2>
                    <p>Create, update, or delete data</p>

                    <div className="card">
                        <CreatePost />
                    </div>
                </section>

                {/* Section 3: Subscriptions */}
                <section className="section">
                    <h2>🔔 Subscriptions</h2>
                    <p>Real-time updates via WebSocket</p>

                    <div className="card">
                        <PostSubscription />
                    </div>
                </section>
            </main>

            <footer>
                <p>
                    Built with React + Apollo Client + GraphQL
                    <br />
                    Server:{' '}
                    <a
                        href="http://localhost:4000/graphql"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        http://localhost:4000/graphql
                    </a>
                </p>
            </footer>
        </div>
    );
}

export default App;
