'use client';

import { useQuery } from '@tanstack/react-query';

type FetchOptions = {
    filters?: Record<string, string | number>;
    page?: number;
    limit?: number;
};

export function useDataFetcher(endpoint: string, options?: FetchOptions) {
    return useQuery({
        queryKey: ['fetchData', endpoint, options],
        queryFn: async ({ queryKey }) => {
            try {
                // Destructure the queryKey to get the endpoint and options
                const [, url, opts] = queryKey as [
                    string,
                    string,
                    FetchOptions | undefined
                ];

                // Construct the URL
                const apiUrl = new URL(url, window.location.origin);

                if (opts) {
                    // Append filter parameters if provided
                    if (opts.filters) {
                        Object.entries(opts.filters).forEach(([key, value]) => {
                            apiUrl.searchParams.append(key, String(value));
                        });
                    }
                    // Append page and limit if provided
                    if (opts.page !== undefined) {
                        apiUrl.searchParams.append('page', String(opts.page));
                    }
                    if (opts.limit !== undefined) {
                        apiUrl.searchParams.append('limit', String(opts.limit));
                    }
                }

                // Make the fetch request
                const response = await fetch(apiUrl.toString());

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                return data;
            } catch (error) {
                throw new Error(
                    error instanceof Error
                        ? error.message
                        : 'An error occurred while fetching data'
                );
            }
        },

        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });
}
