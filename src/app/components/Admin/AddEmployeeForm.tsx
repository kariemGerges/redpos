'use client';

import { useState } from 'react';
import { Employee } from '@/app/types';

interface AddEmployeeProps {
    employee: Employee;
    isEditing: boolean;
    onSave: () => void;
    onCancel: () => void;
    isSubmitting: boolean;
    error: string | null;
    setEmployee: React.Dispatch<React.SetStateAction<Employee | null>>;
}

const AddEmployee: React.FC<AddEmployeeProps> = ({
    employee,
    isEditing,
    onSave,
    onCancel,
    error,
    isSubmitting,
    setEmployee,
}) => {
    // Local state to track validation errors within the form
    const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

    // Form validation function
    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        // Required fields validation
        if (!employee.name?.trim()) {
            errors.name = 'Name is required';
        }

        if (!employee.email?.trim()) {
            errors.email = 'Email is required';
        } else {
            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(employee.email)) {
                errors.email = 'Invalid email format';
            }
        }

        // Password is required only for new employees
        if (!isEditing && !employee.password?.trim()) {
            errors.password = 'Password is required for new employees';
        }

        // Update local errors state
        setLocalErrors(errors);

        // Return true if there are no errors
        return Object.keys(errors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form before submission
        if (validateForm()) {
            onSave();
        }
    };
    

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                >
                    <div className="absolute inset-0 bg-black opacity-75"></div>
                </div>
                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>
                <div className="inline-block align-bottom bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <form onSubmit={handleSubmit}>
                        <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <h3 className="text-lg leading-6 font-medium text-white mb-4">
                                {isEditing
                                    ? 'Edit Employee'
                                    : 'Add New Employee'}
                            </h3>

                            {/* API Error Message */}
                            {error && (
                                <div className="bg-red-900 border border-red-500 text-white px-4 py-3 rounded relative mb-4">
                                    <span className="block sm:inline">
                                        {error}
                                    </span>
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-4">
                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-300"
                                    >
                                        Name{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={`mt-1 block w-full border ${
                                            localErrors.name
                                                ? 'border-red-500'
                                                : 'border-gray-600'
                                        } rounded-md shadow-sm py-2 px-3 bg-gray-800 text-white focus:outline-none focus:ring-red-500 focus:border-red-500`}
                                        value={employee.name || ''}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                            setEmployee({
                                                ...employee,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                    {localErrors.name && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {localErrors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-300"
                                    >
                                        Email{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className={`mt-1 block w-full border ${
                                            localErrors.email
                                                ? 'border-red-500'
                                                : 'border-gray-600'
                                        } rounded-md shadow-sm py-2 px-3 bg-gray-800 text-white focus:outline-none focus:ring-red-500 focus:border-red-500`}
                                        value={employee.email || ''}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                            setEmployee({
                                                ...employee,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                    {localErrors.email && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {localErrors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium text-gray-300"
                                    >
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-800 text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
                                        value={employee.phone || ''}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                            setEmployee({
                                                ...employee,
                                                phone: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                {/* Password (only show for new employees) */}
                                {!isEditing && (
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-300"
                                        >
                                            Password{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            className={`mt-1 block w-full border ${
                                                localErrors.password
                                                    ? 'border-red-500'
                                                    : 'border-gray-600'
                                            } rounded-md shadow-sm py-2 px-3 bg-gray-800 text-white focus:outline-none focus:ring-red-500 focus:border-red-500`}
                                            value={employee.password || ''}
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) =>
                                                setEmployee({
                                                    ...employee,
                                                    password: e.target.value,
                                                })
                                            }
                                        />
                                        {localErrors.password && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {localErrors.password}
                                            </p>
                                        )}
                                    </div>
                                )}


                                {/* Admin Toggle */}
                                <div className="mt-4">
                                    <label className="flex items-center cursor-pointer">
                                        <div className="mr-3">
                                            <span className="block text-sm font-medium text-gray-300">
                                                Admin Access
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                Toggle to grant administrative
                                                privileges
                                            </span>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                id="isAdmin"
                                                className="sr-only"
                                                checked={
                                                    employee.isAdmin || false
                                                }
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                ) =>
                                                    setEmployee({
                                                        ...employee,
                                                        isAdmin:
                                                            e.target.checked,
                                                    })
                                                }
                                            />
                                            <div
                                                className={`block w-14 h-8 rounded-full transition-colors duration-200 ease-in-out ${
                                                    employee.isAdmin
                                                        ? 'bg-red-500'
                                                        : 'bg-gray-600'
                                                }`}
                                            ></div>
                                            <div
                                                className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200 ease-in-out ${
                                                    employee.isAdmin
                                                        ? 'transform translate-x-6'
                                                        : ''
                                                }`}
                                            ></div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            {/* Submit button*/}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
                                    isSubmitting
                                        ? 'bg-gray-500'
                                        : 'bg-red-600 hover:bg-red-700'
                                } text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm`}
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
                                        Saving...
                                    </>
                                ) : (
                                    'Save'
                                )}
                            </button>

                            {/* Cancel button */}
                            <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={onCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    );
};

export default AddEmployee;
