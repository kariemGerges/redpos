import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoginProvider } from '@/app/context/LoginModalContext';

//  Create a client
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

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'RedPOS',
    description: 'Point of Sale and Employee Management System',
    keywords: ['POS', 'RedPOS', 'Point of Sale', 'Employee Management'],
    authors: [
        { name: 'Kariem Gerges', url: 'https://github.com/KariemGerges' },
    ],
    creator: 'Kariem Gerges',
    openGraph: {
        title: 'RedPOS',
        description: 'Point of Sale',
        url: 'https://pos.vercel.app',
        siteName: 'RedPOS',
        locale: 'en-US',
        type: 'website',
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <QueryClientProvider client={queryClient}>
                <LoginProvider>
                    <body
                        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                    >
                        {children}
                    </body>
                </LoginProvider>
            </QueryClientProvider>
        </html>
    );
}
