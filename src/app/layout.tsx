import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';


import QueryProvider from '@/app/providers/providers';
import { LoginProvider } from '@/app/context/LoginModalContext';



const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'NEXTPOS',
    description: 'Point of Sale and Employee Management System',
    keywords: ['POS', 'NEXTPOS', 'Point of Sale', 'Employee Management'],
    authors: [
        { name: 'Kariem Gerges', url: 'https://github.com/KariemGerges' },
    ],
    creator: 'Kariem Gerges',
    openGraph: {
        title: 'NEXTPOS',
        description: 'Point of Sale',
        url: 'https://pos.vercel.app',
        siteName: 'NEXTPOS',
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
            <QueryProvider>
                <LoginProvider>
                    <body
                        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                    >
                        {children}
                    </body>
                </LoginProvider>
            </QueryProvider>
        </html>
    );
}
