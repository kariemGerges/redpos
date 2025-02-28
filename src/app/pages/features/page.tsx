// pages/features.tsx
import React from 'react';
import {
    ShoppingCart,
    BarChart3,
    Users,
    Smartphone,
    Tag,
    Clock,
    Shield,
    RefreshCw,
} from 'lucide-react';
import { MainHeader } from '@/app/components/Headers/MainHeader';
import { Footer } from '@/app/components/Footer';
import Image from 'next/image';

export default function Features() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">

            {/* Navigation */}
            <MainHeader />

            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                            Powerful{' '}
                            <span className="text-red-600">Features</span> to
                            Run Your Business
                        </h1>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                            Our comprehensive POS system comes packed with
                            everything you need to streamline operations and
                            boost sales.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-md font-medium transition duration-300">
                                Start Free Trial
                            </button>
                            <button className="bg-transparent border border-red-600 text-white py-3 px-6 rounded-md font-medium transition duration-300 hover:bg-red-600/10">
                                Schedule Demo
                            </button>
                        </div>
                    </div>
                </div>
                {/* Background pattern/gradient */}
                <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-black to-transparent"></div>
            </div>

            {/* Main Features Section */}
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">
                        Everything You Need in One System
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        NextPOS combines powerful tools to help you manage your
                        business efficiently
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<ShoppingCart className="h-8 w-8 text-red-500" />}
                        title="Point of Sale"
                        description="Fast, intuitive checkout experience with customizable options for different business types."
                    />
                    <FeatureCard
                        icon={<Tag className="h-8 w-8 text-red-500" />}
                        title="Inventory Management"
                        description="Real-time inventory tracking, automated reordering, and detailed stock reports."
                    />
                    <FeatureCard
                        icon={<Users className="h-8 w-8 text-red-500" />}
                        title="Customer Management"
                        description="Build customer profiles, track purchase history, and manage loyalty programs."
                    />
                    <FeatureCard
                        icon={<BarChart3 className="h-8 w-8 text-red-500" />}
                        title="Advanced Analytics"
                        description="Customizable dashboards and reports to track sales, inventory, and employee performance."
                    />
                    <FeatureCard
                        icon={<Smartphone className="h-8 w-8 text-red-500" />}
                        title="Mobile Access"
                        description="Manage your business from anywhere with our mobile app for iOS and Android."
                    />
                    <FeatureCard
                        icon={<Clock className="h-8 w-8 text-red-500" />}
                        title="Employee Management"
                        description="Time tracking, role-based permissions, and performance monitoring."
                    />
                </div>
            </div>

            {/* Detailed Feature Sections */}
            <div className="bg-black py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <DetailedFeature
                        title="Streamlined Point of Sale"
                        description="Our intuitive POS interface is designed for speed and accuracy, reducing lines and improving customer satisfaction."
                        features={[
                            'Fast checkout with barcode scanning and search',
                            'Custom product modifiers and variants',
                            'Split payments and partial refunds',
                            'Custom receipt design with your branding',
                            'Digital receipts via email or SMS',
                        ]}
                        imageSrc="/api/placeholder/600/400"
                        imageAlt="POS Interface"
                        reversed={false}
                    />
                </div>
            </div>

            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <DetailedFeature
                        title="Intelligent Inventory Control"
                        description="Take control of your stock with real-time tracking, automated ordering, and detailed insights that prevent stockouts and overstock situations."
                        features={[
                            'Real-time stock levels across all locations',
                            'Low stock alerts and automated reordering',
                            'Batch tracking and expiration date management',
                            'Supplier management and purchase orders',
                            'Inventory valuation and cost tracking',
                        ]}
                        imageSrc="/api/placeholder/600/400"
                        imageAlt="Inventory Management Dashboard"
                        reversed={true}
                    />
                </div>
            </div>

            <div className="bg-black py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <DetailedFeature
                        title="Powerful Analytics & Reporting"
                        description="Make data-driven decisions with comprehensive analytics that help you understand sales trends, customer behavior, and business performance."
                        features={[
                            'Customizable dashboard with key metrics',
                            'Sales reports by product, category, or time period',
                            'Customer analytics and purchasing patterns',
                            'Employee performance tracking',
                            'Export reports in multiple formats',
                        ]}
                        imageSrc="/api/placeholder/600/400"
                        imageAlt="Analytics Dashboard"
                        reversed={false}
                    />
                </div>
            </div>

            {/* Integration Section */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">
                            Seamless Integrations
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            NextPOS connects with your favorite tools and
                            services to create a unified business ecosystem
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <IntegrationCard name="QuickBooks" />
                        <IntegrationCard name="Shopify" />
                        <IntegrationCard name="Square" />
                        <IntegrationCard name="Stripe" />
                        <IntegrationCard name="PayPal" />
                        <IntegrationCard name="Xero" />
                        <IntegrationCard name="Mailchimp" />
                        <IntegrationCard name="Slack" />
                    </div>
                </div>
            </div>

            {/* Trust Section */}
            <div className="bg-black py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">
                            Built for Security and Reliability
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Your business data is too important to risk. That&apos;s
                            why we&apos;ve built NextPOS with security and
                            reliability at its core.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <TrustCard
                            icon={
                                <Shield className="h-10 w-10 text-red-500 mx-auto" />
                            }
                            title="Enterprise-Grade Security"
                            description="End-to-end encryption, secure payment processing, and regular security audits keep your data safe."
                        />
                        <TrustCard
                            icon={
                                <RefreshCw className="h-10 w-10 text-red-500 mx-auto" />
                            }
                            title="99.9% Uptime Guarantee"
                            description="Our redundant infrastructure ensures your POS system is always available when you need it."
                        />
                        <TrustCard
                            icon={
                                <Clock className="h-10 w-10 text-red-500 mx-auto" />
                            }
                            title="Automatic Backups"
                            description="Your data is automatically backed up every hour, with point-in-time recovery available."
                        />
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-red-900 to-red-700 py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        Ready to transform your business?
                    </h2>
                    <p className="text-xl mb-8 max-w-3xl mx-auto">
                        Join thousands of businesses that trust NextPOS to power
                        their operations every day.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button className="bg-black hover:bg-gray-800 text-white py-3 px-8 rounded-md font-medium transition duration-300">
                            Start Free Trial
                        </button>
                        <button className="bg-transparent border border-black text-black hover:bg-black/10 py-3 px-8 rounded-md font-medium transition duration-300">
                            View Pricing
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
interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
    <div className="bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-red-900">
        <div className="mb-5">{icon}</div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);

interface DetailedFeatureProps {
    title: string;
    description: string;
    features: string[];
    imageSrc: string;
    imageAlt: string;
    reversed: boolean;
}

const DetailedFeature = ({
    title,
    description,
    features,
    imageSrc,
    imageAlt,
    reversed,
}: DetailedFeatureProps) => (
    <div
        className={`flex flex-col ${
            reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
        } items-center gap-12`}
    >
        <div className="lg:w-1/2">
            <Image
                width={600}
                height={400}
                src={imageSrc}
                alt={imageAlt}
                className="rounded-lg shadow-2xl"
            />
        </div>
        <div className="lg:w-1/2">
            <h3 className="text-3xl font-bold mb-4">{title}</h3>
            <p className="text-gray-400 text-lg mb-6">{description}</p>
            <ul className="space-y-3">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <div className="bg-red-600 p-1 rounded-full mr-3 mt-1">
                            <svg
                                className="h-3 w-3 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <button className="mt-8 bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md transition duration-300">
                Learn More
            </button>
        </div>
    </div>
);

interface IntegrationCardProps {
    name: string;
}

const IntegrationCard = ({ name }: IntegrationCardProps) => (
    <div className="bg-gray-800 rounded-lg p-6 flex items-center justify-center border border-gray-700 hover:border-red-600 transition-all">
        <div className="text-center">
            <div className="bg-gray-700 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-400">
                    {name.charAt(0)}
                </span>
            </div>
            <h4 className="font-medium">{name}</h4>
        </div>
    </div>
);

interface TrustCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const TrustCard = ({ icon, title, description }: TrustCardProps) => (
    <div className="bg-gray-900 rounded-xl p-8 text-center border border-gray-800">
        <div className="mb-6">{icon}</div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);
