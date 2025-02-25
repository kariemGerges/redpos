import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Github, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white">
            {/* CTA Section */}
            <div className="bg-red-700 py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Transform Your Business?
                    </h2>
                    <p className="text-xl mb-6 max-w-2xl mx-auto">
                        Join businesses that use our POS system to streamline
                        operations and boost sales.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors">
                            Schedule Demo
                        </button>
                    </div>
                </div>
            </div>

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
                                className="text-gray-400 hover:text-white"
                            >
                                <Facebook />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white"
                            >
                                <Instagram />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white"
                            >
                                <Github />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white"
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
                                    className="text-gray-400 hover:text-white"
                                >
                                    Inventory Management
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Sales Analytics
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Customer Loyalty
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Employee Management
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Multi-location Support
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white"
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
                                    className="text-gray-400 hover:text-white"
                                >
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Case Studies
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                >
                                    API Reference
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white"
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
                                <svg
                                    className="h-6 w-6 mr-2 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    {/* SVG Path */}
                                </svg>
                                <span className="text-gray-400">
                                    support@nextpos.com
                                </span>
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="h-6 w-6 mr-2 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    {/* SVG Path */}
                                </svg>
                                <span className="text-gray-400">
                                    +1 (555) 123-4567
                                </span>
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="h-6 w-6 mr-2 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    {/* SVG Path */}
                                </svg>
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
