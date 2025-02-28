'use client';
import React from 'react';
import { ShoppingCart, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Footer } from './components/Footer';
import Logo from './components/Logo';
import { Header } from './components/Headers/Header';

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            <Logo
                                size="text-4xl"
                                colorN="text-red-500"
                                colorP="text-gray-900"
                            />
                        </h1>
                        <p className="text-xl text-gray-600">
                            Please select your role to continue
                        </p>
                    </div>

                    {/* Role Selection Cards */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Admin Card */}
                        <Link
                            href="pages/admin"
                            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 text-left group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <Users className="h-12 w-12 text-red-600" />
                                <ArrowRight className="h-6 w-6 text-gray-400 group-hover:translate-x-1 transition-transform duration-200" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                Administrator
                            </h2>
                            <p className="text-gray-600">
                                Manage employees, view reports, and handle
                                system settings
                            </p>
                        </Link>

                        {/* Cashier Card */}
                        <Link
                            href="pages/POS"
                            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 text-left group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <ShoppingCart className="h-12 w-12 text-red-600" />
                                <ArrowRight className="h-6 w-6 text-gray-400 group-hover:translate-x-1 transition-transform duration-200" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                Cashier
                            </h2>
                            <p className="text-gray-600">
                                Process sales, manage orders, and handle
                                customer transactions
                            </p>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
