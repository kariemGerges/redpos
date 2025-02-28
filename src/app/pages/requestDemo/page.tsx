'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    companyName: string;
    businessType: string;
    employees: string;
    message: string;
    contactPreference: string;
};

type FormErrors = {
    [key in keyof FormData]?: string;
};

const RequestDemoPage: React.FC = () => {
    const router = useRouter();

    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        companyName: '',
        businessType: '',
        employees: '',
        message: '',
        contactPreference: 'email',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

    const handleChange = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when field is edited
        if (errors[name as keyof FormData]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        // Required fields
        if (!formData.firstName.trim())
            newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim())
            newErrors.lastName = 'Last name is required';
        if (!formData.companyName.trim())
            newErrors.companyName = 'Company name is required';
        if (!formData.businessType)
            newErrors.businessType = 'Business type is required';
        if (!formData.employees)
            newErrors.employees = 'Number of employees is required';

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }

        // Phone validation (optional but must be valid if provided)
        if (
            formData.phone &&
            !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(
                formData.phone
            )
        ) {
            newErrors.phone = 'Phone number is invalid';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Success handling
            setSubmitSuccess(true);

            // Reset form after successful submission
            setTimeout(() => {
                router.push('/thank-you');
            }, 2000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({
                ...errors,
                message: 'Failed to submit form. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950">
            {/* Header */}
            <header className="bg-black py-4 px-4 md:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <Link href="/" className="text-white text-2xl font-bold">
                        <span className="text-red-600">POS</span>System
                    </Link>
                    <nav>
                        <Link
                            href="/"
                            className="text-gray-300 hover:text-white transition-colors duration-200"
                        >
                            Back to Home
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="py-12 px-4 md:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Request a{' '}
                            <span className="text-red-600">
                                Personalized Demo
                            </span>
                        </h1>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            Fill out the form below to schedule a personalized
                            demonstration of our POS and employee management
                            software tailored to your business needs.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 md:p-8">
                        {submitSuccess ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg
                                        className="h-8 w-8 text-green-500"
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
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    Request Submitted Successfully!
                                </h3>
                                <p className="text-gray-300 mb-4">
                                    Thank you for your interest. Our team will
                                    contact you shortly to schedule your
                                    personalized demo.
                                </p>
                                <p className="text-gray-400 text-sm">
                                    Redirecting you to the thank you page...
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Personal Information */}
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4">
                                        Personal Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                htmlFor="firstName"
                                                className="block text-sm font-medium text-gray-300 mb-1"
                                            >
                                                First Name*
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 bg-gray-800 border ${
                                                    errors.firstName
                                                        ? 'border-red-500'
                                                        : 'border-gray-700'
                                                } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500`}
                                            />
                                            {errors.firstName && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.firstName}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="lastName"
                                                className="block text-sm font-medium text-gray-300 mb-1"
                                            >
                                                Last Name*
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 bg-gray-800 border ${
                                                    errors.lastName
                                                        ? 'border-red-500'
                                                        : 'border-gray-700'
                                                } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500`}
                                            />
                                            {errors.lastName && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.lastName}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-gray-300 mb-1"
                                            >
                                                Email Address*
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 bg-gray-800 border ${
                                                    errors.email
                                                        ? 'border-red-500'
                                                        : 'border-gray-700'
                                                } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500`}
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="phone"
                                                className="block text-sm font-medium text-gray-300 mb-1"
                                            >
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 bg-gray-800 border ${
                                                    errors.phone
                                                        ? 'border-red-500'
                                                        : 'border-gray-700'
                                                } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500`}
                                            />
                                            {errors.phone && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.phone}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Business Information */}
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4">
                                        Business Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                htmlFor="companyName"
                                                className="block text-sm font-medium text-gray-300 mb-1"
                                            >
                                                Company Name*
                                            </label>
                                            <input
                                                type="text"
                                                id="companyName"
                                                name="companyName"
                                                value={formData.companyName}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 bg-gray-800 border ${
                                                    errors.companyName
                                                        ? 'border-red-500'
                                                        : 'border-gray-700'
                                                } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500`}
                                            />
                                            {errors.companyName && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.companyName}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="businessType"
                                                className="block text-sm font-medium text-gray-300 mb-1"
                                            >
                                                Business Type*
                                            </label>
                                            <select
                                                id="businessType"
                                                name="businessType"
                                                value={formData.businessType}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 bg-gray-800 border ${
                                                    errors.businessType
                                                        ? 'border-red-500'
                                                        : 'border-gray-700'
                                                } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500`}
                                            >
                                                <option value="">
                                                    Select Business Type
                                                </option>
                                                <option value="retail">
                                                    Retail
                                                </option>
                                                <option value="restaurant">
                                                    Restaurant
                                                </option>
                                                <option value="cafe">
                                                    Cafe/Coffee Shop
                                                </option>
                                                <option value="bar">
                                                    Bar/Pub
                                                </option>
                                                <option value="salon">
                                                    Salon/Spa
                                                </option>
                                                <option value="service">
                                                    Service Business
                                                </option>
                                                <option value="other">
                                                    Other
                                                </option>
                                            </select>
                                            {errors.businessType && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.businessType}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="employees"
                                                className="block text-sm font-medium text-gray-300 mb-1"
                                            >
                                                Number of Employees*
                                            </label>
                                            <select
                                                id="employees"
                                                name="employees"
                                                value={formData.employees}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 bg-gray-800 border ${
                                                    errors.employees
                                                        ? 'border-red-500'
                                                        : 'border-gray-700'
                                                } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500`}
                                            >
                                                <option value="">
                                                    Select Range
                                                </option>
                                                <option value="1-5">
                                                    1-5 employees
                                                </option>
                                                <option value="6-20">
                                                    6-20 employees
                                                </option>
                                                <option value="21-50">
                                                    21-50 employees
                                                </option>
                                                <option value="51-100">
                                                    51-100 employees
                                                </option>
                                                <option value="101+">
                                                    101+ employees
                                                </option>
                                            </select>
                                            {errors.employees && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.employees}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="contactPreference"
                                                className="block text-sm font-medium text-gray-300 mb-1"
                                            >
                                                Preferred Contact Method
                                            </label>
                                            <div className="space-y-2 mt-2">
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="contactPreference"
                                                        value="email"
                                                        checked={
                                                            formData.contactPreference ===
                                                            'email'
                                                        }
                                                        onChange={handleChange}
                                                        className="mr-2 text-red-600 focus:ring-red-500"
                                                    />
                                                    <span className="text-gray-300">
                                                        Email
                                                    </span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="contactPreference"
                                                        value="phone"
                                                        checked={
                                                            formData.contactPreference ===
                                                            'phone'
                                                        }
                                                        onChange={handleChange}
                                                        className="mr-2 text-red-600 focus:ring-red-500"
                                                    />
                                                    <span className="text-gray-300">
                                                        Phone
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Information */}
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-gray-300 mb-1"
                                    >
                                        Tell us about your business needs
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                        placeholder="Please share any specific requirements or questions you have..."
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full md:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors duration-200 flex items-center justify-center disabled:opacity-70"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg
                                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            'Request Your Demo'
                                        )}
                                    </button>
                                </div>

                                {/* Form Error */}
                                {errors.message && (
                                    <div className="p-4 bg-red-500/10 border border-red-500 rounded-md">
                                        <p className="text-red-500">
                                            {errors.message}
                                        </p>
                                    </div>
                                )}

                                {/* Privacy Note */}
                                <div className="text-sm text-gray-400">
                                    By submitting this form, you agree to our{' '}
                                    <Link
                                        href="/privacy"
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        Privacy Policy
                                    </Link>
                                    . We will use your information to respond to
                                    your inquiry and may process your data as
                                    described in our policy.
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Contact Alternative */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-300">
                            Prefer to talk directly? Contact our sales team at{' '}
                            <a
                                href="mailto:sales@possystem.com"
                                className="text-red-400 hover:text-red-300"
                            >
                                sales@possystem.com
                            </a>
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-black py-6 px-4 md:px-6 lg:px-8 mt-8">
                <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
                    <p>
                        &copy; {new Date().getFullYear()} POS System. All rights
                        reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default RequestDemoPage;