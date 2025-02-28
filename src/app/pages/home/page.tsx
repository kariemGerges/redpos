'use client';
import React from 'react';
import Logo from '@/app/components/Logo';
import { MainHeader } from '@/app/components/Headers/MainHeader';
import { Footer } from '@/app/components/Footer';
import TestimonialsSection from '@/app/components/HomePage/Testimonial';
import { CTASection } from '@/app/components/HomePage/CTASection';
import { FeaturesSection } from '@/app/components/HomePage/FeaturesSection';

const HomePage: React.FC = () => {
    return (
        <div className=" min-h-screen flex flex-col">
            <MainHeader />
            <main className="flex-grow">
                <div className="max-w-full mx-auto px-4 py-12">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="font-bold mb-4">
                            <Logo
                                size="text-4xl"
                                colorN="text-red-500"
                                colorP="text-gray-900 dark:text-gray-100"
                            />
                        </h1>
                    </div>
                    <FeaturesSection />
                    <CTASection />
                    <TestimonialsSection />
                </div>

                {/* CTA Section */}
                <div className="bg-red-700 py-12">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Ready to Transform Your Business?
                        </h2>
                        <p className="text-xl mb-6 max-w-2xl mx-auto">
                            Join businesses that use our POS system to
                            streamline operations and boost sales.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-gray-950 transition-colors">
                                Schedule Demo
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
