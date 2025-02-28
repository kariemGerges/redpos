// pages/pricing.tsx
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { MainHeader } from '@/app/components/Headers/MainHeader';
import { Footer } from '@/app/components/Footer';

export default function Pricing() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">

            {/* Navigation */}
            <MainHeader />

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                    Simple, Transparent{' '}
                    <span className="text-red-600">Pricing</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                    Choose the perfect plan for your business needs. No hidden
                    fees, no surprises.
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Starter Plan */}
                    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 transition-transform hover:scale-105">
                        <div className="p-8 border-b border-gray-700">
                            <h3 className="text-xl font-semibold text-gray-300 mb-2">
                                Starter
                            </h3>
                            <p className="flex items-baseline">
                                <span className="text-4xl font-bold text-white">
                                    $49
                                </span>
                                <span className="text-gray-400 ml-2">
                                    /month
                                </span>
                            </p>
                            <p className="text-gray-400 mt-4">
                                Perfect for small businesses just getting
                                started
                            </p>
                        </div>
                        <div className="p-8">
                            <ul className="space-y-4">
                                <Feature text="Single register terminal" />
                                <Feature text="Basic inventory management" />
                                <Feature text="Sales reporting" />
                                <Feature text="Customer database" />
                                <Feature text="Email support" />
                            </ul>
                            <button className="w-full mt-8 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-md font-medium transition duration-300">
                                Get Started
                            </button>
                        </div>
                    </div>

                    {/* Professional Plan - Highlighted */}
                    <div className="bg-black rounded-xl overflow-hidden shadow-2xl border border-red-600 transform scale-105">
                        <div className="p-1 bg-gradient-to-r from-red-600 to-red-500" />
                        <div className="p-8 border-b border-gray-700 relative">
                            <div className="absolute -top-1 right-8 bg-red-600 text-white text-xs py-1 px-3 rounded-b-md font-medium">
                                POPULAR
                            </div>
                            <h3 className="text-xl font-semibold text-gray-300 mb-2">
                                Professional
                            </h3>
                            <p className="flex items-baseline">
                                <span className="text-4xl font-bold text-white">
                                    $99
                                </span>
                                <span className="text-gray-400 ml-2">
                                    /month
                                </span>
                            </p>
                            <p className="text-gray-400 mt-4">
                                Ideal for growing businesses with multiple needs
                            </p>
                        </div>
                        <div className="p-8">
                            <ul className="space-y-4">
                                <Feature text="Up to 3 register terminals" />
                                <Feature text="Advanced inventory management" />
                                <Feature text="Detailed analytics dashboard" />
                                <Feature text="Employee management" />
                                <Feature text="Customer loyalty program" />
                                <Feature text="24/7 priority support" />
                            </ul>
                            <button className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-medium transition duration-300">
                                Get Started
                            </button>
                        </div>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 transition-transform hover:scale-105">
                        <div className="p-8 border-b border-gray-700">
                            <h3 className="text-xl font-semibold text-gray-300 mb-2">
                                Enterprise
                            </h3>
                            <p className="flex items-baseline">
                                <span className="text-4xl font-bold text-white">
                                    $249
                                </span>
                                <span className="text-gray-400 ml-2">
                                    /month
                                </span>
                            </p>
                            <p className="text-gray-400 mt-4">
                                For established businesses with complex
                                requirements
                            </p>
                        </div>
                        <div className="p-8">
                            <ul className="space-y-4">
                                <Feature text="Unlimited register terminals" />
                                <Feature text="Multi-location management" />
                                <Feature text="Advanced inventory control" />
                                <Feature text="Custom reporting" />
                                <Feature text="API access" />
                                <Feature text="Dedicated account manager" />
                                <Feature text="On-site training" />
                            </ul>
                            <button className="w-full mt-8 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-md font-medium transition duration-300">
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-8">
                    <FaqItem
                        question="Do you offer a free trial?"
                        answer="Yes, we offer a 14-day free trial for all pricing plans. No credit card required."
                    />
                    <FaqItem
                        question="Can I change plans later?"
                        answer="Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle."
                    />
                    <FaqItem
                        question="What payment methods do you accept?"
                        answer="We accept all major credit cards, PayPal, and ACH bank transfers for annual plans."
                    />
                    <FaqItem
                        question="Is there a setup fee?"
                        answer="No, there are no setup fees or hidden costs. The price you see is the price you pay."
                    />
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-black py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">
                            Ready to transform your business?
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Join thousands of businesses using FULLPOS
                        </p>
                    </div>
                    <div className="mt-6 md:mt-0 flex space-x-4">
                        <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-md font-medium transition duration-300">
                            Get Started
                        </button>
                        <button className="bg-transparent border border-gray-600 hover:border-gray-500 text-white py-3 px-6 rounded-md font-medium transition duration-300">
                            Request Demo
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

// Helper Components
const Feature = ({ text }: { text: string }) => (
    <li className="flex items-start">
        <CheckCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
        <span className="text-gray-300">{text}</span>
    </li>
);

const FaqItem = ({ question, answer }: { question: string; answer: string }) => (
    <div className="border-b border-gray-800 pb-6">
        <h3 className="text-xl font-medium mb-2">{question}</h3>
        <p className="text-gray-400">{answer}</p>
    </div>
);
