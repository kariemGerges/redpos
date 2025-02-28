'use client';
import React from 'react';
import Link from 'next/link';
import {
    Facebook,
    Instagram,
    Github,
    Globe,
    AtSign,
    Phone,
    MapPinPlusInside,
} from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white">

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold mb-4">NextPOS</h3>
                        <p className="text-gray-400">
                            The most intuitive and powerful point-of-sale
                            solution for modern businesses.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-red-500 transition"
                            >
                                <Facebook />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-red-500 transition"
                            >
                                <Instagram />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-red-500 transition"
                            >
                                <Github />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-red-500 transition"
                            >
                                <Globe />
                            </a>
                        </div>
                    </div>

                    {/* Features */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Features</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-red-500 transition"
                                >
                                    Inventory Management
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-red-500 transition"
                                >
                                    Sales Analytics
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-red-500 transition"
                                >
                                    Customer Loyalty
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-red-500 transition"
                                >
                                    Employee Management
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-red-500 transition"
                                >
                                    Multi-location Support
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-red-500 transition"
                                >
                                    Mobile Access
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-red-500 transition"
                                >
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-red-500 transition"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-red-500 transition"
                                >
                                    Case Studies
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-red-500 transition"
                                >
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-red-500 transition"
                                >
                                    API Reference
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-red-500 transition"
                                >
                                    Community Forum
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact</h3>
                        <ul className="space-y-2">
                            <li className="flex items-start">
                                <AtSign className=" mr-2 text-gray-400" />
                                <span className="text-gray-400">
                                    support@nextpos.com
                                </span>
                            </li>
                            <li className="flex items-start">
                                <Phone className="mr-2 text-gray-400" />
                                <span className="text-gray-400">
                                    +1 (555) 123-4567
                                </span>
                            </li>
                            <li className="flex items-start">
                                <MapPinPlusInside className="mr-2 text-gray-400" />
                                <span className="text-gray-400">
                                    123 Tech Plaza
                                    <br />
                                    San Francisco, CA 94107
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-black py-4">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm">
                            © 2025 NextPOS. All rights reserved.
                        </p>
                        <p className="text-gray-500 text-sm mt-4 md:mt-0">
                            Made with ❤️ by Kariem
                        </p>
                        <div className="mt-4 md:mt-0">
                            <ul className="flex space-x-6">
                                <li>
                                    <Link
                                        href="#"
                                        className="text-gray-500 text-sm hover:text-gray-400"
                                    >
                                        Terms
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-gray-500 text-sm hover:text-gray-400"
                                    >
                                        Privacy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-gray-500 text-sm hover:text-gray-400"
                                    >
                                        Cookies
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
