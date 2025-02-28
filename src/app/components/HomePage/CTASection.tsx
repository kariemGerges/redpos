'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';

export const CTASection: React.FC =() => {
    const [email, setEmail] = useState<string>('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // Handle form submission here
        console.log('Email submitted:', email);
        setEmail('');
        // Show success message or redirect
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };

    return (
        <section className="w-full bg-black py-16 px-4 md:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left content */}
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                            Revolutionize Your{' '}
                            <span className="text-red-600">
                                Business Operations
                            </span>
                        </h2>
                        <p className="text-gray-300 text-lg">
                            All-in-one solution for POS and employee management.
                            Streamline operations, boost productivity, and take
                            control of your business.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/demo"
                                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200"
                            >
                                Request Demo
                            </Link>
                            <Link
                                href="/pricing"
                                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white border border-red-600 hover:bg-red-600/10 rounded-md transition-colors duration-200"
                            >
                                View Pricing
                            </Link>
                        </div>
                    </div>

                    {/* Right content - Newsletter/Contact form */}
                    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                        <h3 className="text-xl font-bold text-white mb-4">
                            Get Early Access
                        </h3>
                        <p className="text-gray-400 mb-6">
                            Join our exclusive list for early access, updates,
                            and special offers.
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="sr-only">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Enter your business email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors duration-200"
                                >
                                    Stay Updated
                                </button>
                            </div>
                        </form>
                        <p className="text-gray-500 text-sm mt-4">
                            No spam. Unsubscribe anytime.
                        </p>
                    </div>
                </div>

                {/* Features highlight */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                    <div className="p-6 bg-gray-900 rounded-lg border border-gray-800">
                        <div className="h-12 w-12 bg-red-600/20 rounded-full flex items-center justify-center mb-4">
                            <svg
                                className="h-6 w-6 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Intuitive POS
                        </h3>
                        <p className="text-gray-400">
                            Modern interface designed for speed and ease of use.
                        </p>
                    </div>
                    <div className="p-6 bg-gray-900 rounded-lg border border-gray-800">
                        <div className="h-12 w-12 bg-red-600/20 rounded-full flex items-center justify-center mb-4">
                            <svg
                                className="h-6 w-6 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Staff Management
                        </h3>
                        <p className="text-gray-400">
                            Schedule, track, and optimize your workforce
                            efficiently.
                        </p>
                    </div>
                    <div className="p-6 bg-gray-900 rounded-lg border border-gray-800">
                        <div className="h-12 w-12 bg-red-600/20 rounded-full flex items-center justify-center mb-4">
                            <svg
                                className="h-6 w-6 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Real-time Analytics
                        </h3>
                        <p className="text-gray-400">
                            Data-driven insights to help your business grow.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
