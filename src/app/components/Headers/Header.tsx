'use client';
import React from 'react';
import Link from 'next/link';
import Logo from '../Logo';

export const Header: React.FC = () => {
    return (
        <header className="bg-black text-white py-4 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/">
                    <span className="text-3xl font-bold tracking-wide">
                        <Logo
                            size="text-3xl"
                            colorN="text-red-500"
                            colorP="text-white"
                        />
                    </span>
                </Link>

                {/* Call to Action Button */}
                <Link href="pages/home">
                    <button className="bg-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-500 transition">
                        Contact Us
                    </button>
                </Link>
            </div>
        </header>
    );
};
