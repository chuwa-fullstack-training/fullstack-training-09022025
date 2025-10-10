import { useQuery } from '@tanstack/react-query';
import './ReactQueryDemo.css';

function waitForFetch(data, delay) {
    return new Promise(resovle => {
        setTimeout(() => resovle(data), delay);
    });
}

const fetchTodo = async () => {
    const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos/1'
    );

    if (!response.ok) {
        throw new Error('Unable to fetch sample todo');
    }

    const result = await response.json();
    return waitForFetch(result, 3000);
};

export function ReactQueryDemo() {
    const { data, error, isError, isLoading, refetch, status, isRefetching } =
        useQuery({
            queryKey: ['sample-todo'],
            queryFn: fetchTodo
        });

    return (
        <section className="react-query-card">
            <header className="react-query-card__header">
                <div>
                    <p className="react-query-card__eyebrow">React Query</p>
                    <h2 className="react-query-card__title">
                        Sample Todo Fetch
                    </h2>
                </div>
                <span className="react-query-card__status">{status}</span>
            </header>

            <div className="react-query-card__content">
                {(isLoading || isRefetching) && (
                    <p className="react-query-card__loading">Loading todo...</p>
                )}

                {isError && (
                    <p className="react-query-card__error">
                        Error:{' '}
                        <span className="react-query-card__error-message">
                            {error.message}
                        </span>
                    </p>
                )}

                {!isLoading && !isRefetching && !isError && (
                    <dl className="react-query-card__rows">
                        <div className="react-query-card__row">
                            <dt>ID</dt>
                            <dd>{data.id}</dd>
                        </div>
                        <div className="react-query-card__row">
                            <dt>Title</dt>
                            <dd>{data.title}</dd>
                        </div>
                        <div className="react-query-card__row">
                            <dt>Completed</dt>
                            <dd>{data.completed ? 'Yes' : 'No'}</dd>
                        </div>
                    </dl>
                )}
            </div>

            <div className="react-query-card__actions">
                <button
                    type="button"
                    className="react-query-card__button"
                    onClick={async () => await refetch()}
                >
                    Refetch
                </button>
            </div>
        </section>
    );
}
