// app/page.tsx
'use client';

import React from 'react';
import { ShoppingCart, Users, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const router = useRouter();

    const handleRoleSelect = (role: 'admin' | 'cashier') => {
        if (role === 'admin') {
            router.push('/admin/dashboard');
        } else {
            router.push('/pos');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Welcome to RedPOS
                    </h1>
                    <p className="text-xl text-gray-600">
                        Please select your role to continue
                    </p>
                </div>

                {/* Role Selection Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Admin Card */}
                    <button
                        onClick={() => handleRoleSelect('admin')}
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 text-left group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <Users className="h-12 w-12 text-blue-600" />
                            <ArrowRight className="h-6 w-6 text-gray-400 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                            Administrator
                        </h2>
                        <p className="text-gray-600">
                            Manage employees, view reports, and handle system
                            settings
                        </p>
                    </button>

                    {/* Cashier Card */}
                    <button
                        onClick={() => handleRoleSelect('cashier')}
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 text-left group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <ShoppingCart className="h-12 w-12 text-green-600" />
                            <ArrowRight className="h-6 w-6 text-gray-400 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                            Cashier
                        </h2>
                        <p className="text-gray-600">
                            Process sales, manage orders, and handle customer
                            transactions
                        </p>
                    </button>
                </div>

                {/* Footer */}
                <footer className="mt-16 text-center text-gray-500">
                    <p>© 2025 RedPOS. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
