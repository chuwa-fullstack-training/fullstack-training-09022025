import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { client } from './apolloClient';
import App from './App';

/**
 * Application Entry Point
 *
 * Wraps the app with ApolloProvider to make Apollo Client
 * available to all components via hooks
 */

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
