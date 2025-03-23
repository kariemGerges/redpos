'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

type MutationOptions = {
    method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    onSuccessQueryKey?: string | string[];
};

export function useDataMutation<T>(
    endpoint: string,
    options?: MutationOptions
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: T) => {
            try {
                const apiUrl = new URL(endpoint, window.location.origin);

                // Make the fetch request
                const response = await fetch(apiUrl.toString(), {
                    method: options?.method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => null);
                    throw new Error(
                        errorData?.message ||
                            `HTTP error! status: ${response.status}`
                    );
                }

                return await response.json();
            } catch (error) {
                throw new Error(
                    error instanceof Error
                        ? error.message
                        : 'An error occurred during the operation'
                );
            }
        },
        onSuccess: () => {
            // Invalidate relevant queries to refetch data
            if (options?.onSuccessQueryKey) {
                if (Array.isArray(options.onSuccessQueryKey)) {
                    options.onSuccessQueryKey.forEach((key) => {
                        queryClient.invalidateQueries({ queryKey: [key] });
                    });
                } else {
                    queryClient.invalidateQueries({
                        queryKey: [options.onSuccessQueryKey],
                    });
                }
            }
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        },
    });
}
