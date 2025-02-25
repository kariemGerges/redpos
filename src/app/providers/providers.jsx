// this file is used to provide the QueryClient to the entire application since it cannt be done at layout level in Next.js because layout is a server side rendered component
// this is a custom provider that wraps the QueryClientProvider from react-query

'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function QueryProvider({ children }) {

    // Create a QueryClient instance
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                // How many times to retry a failed request
                retry: 2,
                // Exponential backoff or custom function
                retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
                // Don't refetch on window focus (personal preference)
                refetchOnWindowFocus: false,
                // Keep data fresh for 60 seconds before it becomes “stale”
                staleTime: 1000 * 60,
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* Optional: Include React Query DevTools */}
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
    );
}
