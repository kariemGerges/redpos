'use client';

import React, { useState } from 'react';
// import Image from 'next/image';

type FeatureTab = 'pos' | 'employees' | 'inventory' | 'analytics';

export const FeaturesSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<FeatureTab>('pos');

    return (
        <section className="w-full bg-gray-950 py-16 px-4 md:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        The Complete{' '}
                        <span className="text-red-600">
                            Business Management
                        </span>{' '}
                        Solution
                    </h2>
                    <p className="text-gray-300 max-w-3xl mx-auto">
                        Our comprehensive POS and employee management platform
                        is designed to scale with your business, whether you are
                        running a single location or managing multiple stores.
                    </p>
                </div>

                {/* Feature Tabs Navigation */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {[
                        { id: 'pos', label: 'Point of Sale' },
                        { id: 'employees', label: 'Employee Management' },
                        { id: 'inventory', label: 'Inventory Control' },
                        { id: 'analytics', label: 'Advanced Analytics' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as FeatureTab)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200
                ${
                    activeTab === tab.id
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Feature Content Area */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                    {/* Feature Image - 2 columns on md+ screens */}
                    <div className="md:col-span-2 bg-gray-900 rounded-lg p-4 order-2 md:order-1">
                        <div className="relative h-64 w-full md:h-80 rounded-lg overflow-hidden border border-gray-800">
                            {activeTab === 'pos' && (
                                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                                    <div className="text-center p-4">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-600/20 flex items-center justify-center">
                                            <svg
                                                className="h-8 w-8 text-red-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-gray-300">
                                            POS Interface Visualization
                                        </p>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'employees' && (
                                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                                    <div className="text-center p-4">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-600/20 flex items-center justify-center">
                                            <svg
                                                className="h-8 w-8 text-red-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-gray-300">
                                            Employee Management Dashboard
                                        </p>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'inventory' && (
                                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                                    <div className="text-center p-4">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-600/20 flex items-center justify-center">
                                            <svg
                                                className="h-8 w-8 text-red-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-gray-300">
                                            Inventory Management System
                                        </p>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'analytics' && (
                                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                                    <div className="text-center p-4">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-600/20 flex items-center justify-center">
                                            <svg
                                                className="h-8 w-8 text-red-500"
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
                                        <p className="text-gray-300">
                                            Advanced Analytics Dashboard
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Feature Description - 3 columns on md+ screens */}
                    <div className="md:col-span-3 order-1 md:order-2">
                        {activeTab === 'pos' && (
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-white">
                                    Powerful Point of Sale System
                                </h3>
                                <p className="text-gray-300">
                                    Our intuitive POS system is designed for
                                    speed and efficiency, helping you serve
                                    customers faster while capturing all the
                                    data you need.
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                    {[
                                        'Fast checkout process',
                                        'Multi-payment options',
                                        'Customer profiles & history',
                                        'Discount & promotion management',
                                        'Customizable interface',
                                        'Works online & offline',
                                    ].map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex items-start"
                                        >
                                            <svg
                                                className="h-5 w-5 text-red-500 mr-2 mt-0.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            <span className="text-gray-300">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-gray-400">
                                    Perfect for retail stores, restaurants,
                                    cafes, and service businesses of any size.
                                    Our system scales from single-terminal
                                    setups to multi-location enterprises.
                                </p>
                            </div>
                        )}

                        {activeTab === 'employees' && (
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-white">
                                    Complete Employee Management
                                </h3>
                                <p className="text-gray-300">
                                    Take control of your workforce with
                                    comprehensive tools designed to optimize
                                    scheduling, track performance, and
                                    streamline payroll.
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                    {[
                                        'Shift scheduling & planning',
                                        'Time clock & attendance',
                                        'Performance tracking',
                                        'Task management',
                                        'Permission controls',
                                        'Payroll integration',
                                    ].map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex items-start"
                                        >
                                            <svg
                                                className="h-5 w-5 text-red-500 mr-2 mt-0.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            <span className="text-gray-300">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-gray-400">
                                    From small teams to large workforces across
                                    multiple locations, our employee management
                                    tools help you optimize labor costs while
                                    improving staff satisfaction.
                                </p>
                            </div>
                        )}

                        {activeTab === 'inventory' && (
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-white">
                                    Smart Inventory Control
                                </h3>
                                <p className="text-gray-300">
                                    Keep track of your stock in real-time with
                                    automated inventory management that prevents
                                    stockouts and reduces waste.
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                    {[
                                        'Real-time stock tracking',
                                        'Automated reordering',
                                        'Multi-location inventory',
                                        'Supplier management',
                                        'Barcode & RFID support',
                                        'Batch & expiry tracking',
                                    ].map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex items-start"
                                        >
                                            <svg
                                                className="h-5 w-5 text-red-500 mr-2 mt-0.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            <span className="text-gray-300">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-gray-400">
                                    Inventory management that grows with your
                                    business, from basic stock control to
                                    complex multi-warehouse operations with
                                    custom reporting.
                                </p>
                            </div>
                        )}

                        {activeTab === 'analytics' && (
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-white">
                                    Data-Driven Business Intelligence
                                </h3>
                                <p className="text-gray-300">
                                    Turn your sales and operational data into
                                    actionable insights with powerful analytics
                                    tools designed for business owners.
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                    {[
                                        'Sales performance metrics',
                                        'Employee productivity',
                                        'Custom reporting',
                                        'Trend analysis',
                                        'Forecasting tools',
                                        'Data export & integration',
                                    ].map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex items-start"
                                        >
                                            <svg
                                                className="h-5 w-5 text-red-500 mr-2 mt-0.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            <span className="text-gray-300">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-gray-400">
                                    From daily sales reports to complex business
                                    intelligence dashboards, our analytics tools
                                    help you make better decisions based on real
                                    data.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Business Size Compatibility */}
                <div className="mt-16 bg-gray-900 rounded-lg p-8 border border-gray-800">
                    <h3 className="text-xl font-bold text-white mb-6 text-center">
                        Tailored For All Business Sizes
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-600/20 flex items-center justify-center">
                                <svg
                                    className="h-8 w-8 text-red-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>
                            </div>
                            <h4 className="text-lg font-semibold text-white mb-2">
                                Small Businesses
                            </h4>
                            <p className="text-gray-400">
                                Affordable solutions for startups and small
                                businesses with essential features and easy
                                setup. Grow your business without complex IT
                                requirements.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-600/20 flex items-center justify-center">
                                <svg
                                    className="h-8 w-8 text-red-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                                    />
                                </svg>
                            </div>
                            <h4 className="text-lg font-semibold text-white mb-2">
                                Medium Enterprises
                            </h4>
                            <p className="text-gray-400">
                                Comprehensive tools for growing businesses with
                                multiple employees, locations, or departments.
                                Advanced reporting and integrations included.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-600/20 flex items-center justify-center">
                                <svg
                                    className="h-8 w-8 text-red-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>
                            </div>
                            <h4 className="text-lg font-semibold text-white mb-2">
                                Large Corporations
                            </h4>
                            <p className="text-gray-400">
                                Enterprise-grade solutions with multi-location
                                management, advanced security, custom API
                                access, and dedicated support for maximum
                                scalability.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
