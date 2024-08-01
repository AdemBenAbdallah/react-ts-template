import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import { AuthProvider } from './common/contexts/index.ts';
import AuthMiddleware from './common/middleware/AuthMiddleware.tsx';
import { RootErrorFallback } from './core/components/ErrorComponent.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <MantineProvider>
          <AuthProvider>
            <AuthMiddleware>
              <ErrorBoundary FallbackComponent={RootErrorFallback}>
                <App />
              </ErrorBoundary>
            </AuthMiddleware>
          </AuthProvider>
        </MantineProvider>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
