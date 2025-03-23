'use client';

import { useState, useEffect } from 'react';
import { Employee } from '@/app/types';

interface EditEmployeeProps {
    employee: Employee;
    isEditing: boolean;
    onSave: (id: string, updatedEmployee: Partial<Employee>) => void;
    onCancel: () => void;
    isSubmitting: boolean;
    error: string | null;
    setEmployee: React.Dispatch<React.SetStateAction<Employee | null>>;
}

const EditEmployeeForm: React.FC<EditEmployeeProps> = ({
    employee,
    onSave,
    onCancel,
    error,
    isSubmitting,
    setEmployee,
}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        password: '',
        isAdmin: false,
        isActive: true,
        isBanned: false,
    });

    const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

    // Initialize form with employee data
    useEffect(() => {
        if (employee) {
            setFormData({
                name: employee.name || '',
                email: employee.email || '',
                phone: employee.phone || '',
                password: '', // Don't populate password field for security
                role: employee.role || '',
                isAdmin: employee.isAdmin || false,
                isActive: employee.isActive || false,
                isBanned: employee.isBanned || false,
            });
        }
    }, [employee]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target as HTMLInputElement;

        // Handle checkbox inputs
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
            }));
            setEmployee((prevEmployee) => {
                if (!prevEmployee) return null;
                return {
                    ...prevEmployee,
                    [name]: checked,
                };
            });
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
            setEmployee((prevEmployee) => {
                if (!prevEmployee) return null;
                return {
                    ...prevEmployee,
                    [name]: value,
                };
            });
        }

        // Clear error for this field when user types
        if (localErrors[name]) {
            setLocalErrors((prev) => {
                const updated = { ...prev };
                delete updated[name];
                return updated;
            });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        // Validate name
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        // Validate role
        if (!formData.role) {
            newErrors.role = 'Role is required';
        }

        // Update local errors state
        setLocalErrors(newErrors);

        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form before submission
        if (validateForm()) {
            // Update employee with new data
            const updatedEmployee = {
                ...formData,
                updatedAt: new Date().toISOString(),
            };

            // Only include password if it was changed
            if (!formData.password) {
                delete updatedEmployee.password;
            }

            onSave(employee._id, updatedEmployee);
        } else {
            // Focus the first field with an error
            const firstErrorField = document.querySelector('.border-red-500');
            if (firstErrorField) {
                (firstErrorField as HTMLElement).focus();
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-white">
                        Edit Employee: {employee.name}
                    </h3>
                    <button
                        onClick={onCancel}
                        className="text-gray-400 hover:text-white"
                    >
                        &times;
                    </button>
                </div>

                {/* API Error Message */}
                {error && (
                    <div className="bg-red-900 border border-red-500 text-white px-4 py-3 rounded relative mb-4">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md bg-gray-700 border ${
                                localErrors.name
                                    ? 'border-red-500'
                                    : 'border-gray-600'
                            } text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500`}
                        />
                        {localErrors.name && (
                            <p className="mt-1 text-sm text-red-500">
                                {localErrors.name}
                            </p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md bg-gray-700 border ${
                                localErrors.email
                                    ? 'border-red-500'
                                    : 'border-gray-600'
                            } text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500`}
                        />
                        {localErrors.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {localErrors.email}
                            </p>
                        )}
                    </div>

                    {/* Phone Field */}
                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    {/* Password (optional for editing) */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Password{' '}
                            <span className="text-gray-500 text-xs">
                                (Leave blank to keep current password)
                            </span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Role Field */}
                    <div>
                        <label
                            htmlFor="role"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Role <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md bg-gray-700 border ${
                                localErrors.role
                                    ? 'border-red-500'
                                    : 'border-gray-600'
                            } text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500`}
                        >
                            <option value="">Select a role</option>
                            <option value="Admin">Admin</option>
                            <option value="Manager">Manager</option>
                            <option value="Cashier">Cashier</option>
                        </select>
                        {localErrors.role && (
                            <p className="mt-1 text-sm text-red-500">
                                {localErrors.role}
                            </p>
                        )}
                    </div>

                    {/* Admin Toggle */}
                    <div className="mt-4">
                        <label className="flex items-center cursor-pointer">
                            <div className="mr-3">
                                <span className="block text-sm font-medium text-gray-300">
                                    Admin Access
                                </span>
                                <span className="text-xs text-gray-500">
                                    Toggle to grant administrative privileges
                                </span>
                            </div>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="isAdmin"
                                    name="isAdmin"
                                    className="sr-only"
                                    checked={formData.isAdmin}
                                    onChange={handleChange}
                                />
                                <div
                                    className={`block w-14 h-8 rounded-full transition-colors duration-200 ease-in-out ${
                                        formData.isAdmin
                                            ? 'bg-red-500'
                                            : 'bg-gray-600'
                                    }`}
                                ></div>
                                <div
                                    className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200 ease-in-out ${
                                        formData.isAdmin
                                            ? 'transform translate-x-6'
                                            : ''
                                    }`}
                                ></div>
                            </div>
                        </label>
                    </div>

                    {/* Employee Status */}
                    <div className="border-t border-gray-700 pt-4">
                        <h4 className="text-sm font-medium text-gray-300 mb-2">
                            Employee Status
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    name="isActive"
                                    checked={formData.isActive}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-500 rounded focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="isActive"
                                    className="ml-2 block text-sm text-gray-300"
                                >
                                    Active Employee
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isBanned"
                                    name="isBanned"
                                    checked={formData.isBanned}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-red-600 bg-gray-700 border-gray-500 rounded focus:ring-red-500"
                                />
                                <label
                                    htmlFor="isBanned"
                                    className="ml-2 block text-sm text-gray-300"
                                >
                                    Ban User
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Employee Information (Read-only section) */}
                    <div className="border-t border-gray-700 pt-4">
                        <h4 className="text-sm font-medium text-gray-300 mb-2">
                            Employee Information
                        </h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <div className="text-gray-400">Created At:</div>
                            <div className="text-gray-300">
                                {employee.createdAt
                                    ? new Date(
                                          employee.createdAt
                                      ).toLocaleString()
                                    : 'N/A'}
                            </div>

                            <div className="text-gray-400">Last Updated:</div>
                            <div className="text-gray-300">
                                {employee.updatedAt
                                    ? new Date(
                                          employee.updatedAt
                                      ).toLocaleString()
                                    : 'N/A'}
                            </div>

                            <div className="text-gray-400">Last Login:</div>
                            <div className="text-gray-300">
                                {employee.lastLogin
                                    ? new Date(
                                          employee.lastLogin
                                      ).toLocaleString()
                                    : 'Never'}
                            </div>

                            {employee.deletedAt && (
                                <>
                                    <div className="text-gray-400">
                                        Deleted At:
                                    </div>
                                    <div className="text-gray-300">
                                        {new Date(
                                            employee.deletedAt
                                        ).toLocaleString()}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded focus:outline-none"
                        >
                            Cancel
                        </button>
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
                                'Save Changes'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEmployeeForm;
