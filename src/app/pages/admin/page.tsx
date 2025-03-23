'use client';
import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { useDataFetcher } from '@/app/hooks/useDataFetcher';
import { useDataMutation } from '@/app/hooks/useDataMutation';

// import components
import AddEmployeeForm from '@/app/components/Admin/AddEmployeeForm';
import EditEmployeeForm from '@/app/components/Admin/EditEmployeeForm';
import StatsOverview from '@/app/components/Admin/ui/StatsOverviewSection';
import AddEmployeeSection from '@/app/components/Admin/ui/AddEmployeeSection';
import Pagination from '@/app/components/Admin/ui/Pagination';
import EmployeesTableSection from '@/app/components/Admin/ui/EmployeesTableSection';
import SuccessMessage from '@/app/components/Admin/ui/Success';

import { Employee } from '@/app/types';

const getStatusBadgeColor = (status: Employee['status']): string => {
    switch (status) {
        case 'Active':
            return 'bg-red-600 text-white';
        case 'On Leave':
            return 'bg-black text-red-500';
        case 'Terminated':
            return 'bg-red-900 text-white';
        default:
            return 'bg-gray-600 text-gray-300';
    }
};

const EmployeeDashboard: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('');

    const [addEmployee, setAddEmployee] = useState<Employee | null>(null);
    const [editEmployee, setEditEmployee] = useState<Employee | null>(null);

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
        null
    );
    const [formErrors, setFormErrors] = useState<string | null>(null);
    const [editFormErrors, setEditFormErrors] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);

    // Fetch employees from API
    const { data, isLoading, isError } = useDataFetcher('/api/empl/getAllEmpl');

    const emplData = data?.employeeData.Users || [];
    const emplCount = data?.employeeData.totalEmployee || 0;
    const currentPage = data?.employeeData.currentPage || 1;
    const totalPages = data?.employeeData.totalPages || 1;
    // console.dir(data);

    // Setup mutation for adding employees
    type EmployeeSubsetAdd = Pick<
        Employee,
        'name' | 'email' | 'password' | 'phone' | 'isAdmin'
    >;

    type EmployeeSubsetEdit = Pick<
        Employee,
        | 'name'
        | 'email'
        | 'password'
        | 'phone'
        | 'role'
        | 'isAdmin'
        | 'isActive'
        | 'isBanned'
    >;

    const addEmployeeMutation = useDataMutation<Omit<EmployeeSubsetAdd, '_id'>>(
        '/api/empl/registerEmpl',
        {
            method: 'POST',
            onSuccessQueryKey: 'fetchData', // This will invalidate all queries that start with 'fetchData'
        }
    );

    const editEmployeeMutation = useDataMutation<
        Omit<EmployeeSubsetEdit, '_id'>
    >(`/api/empl/editEmpl?id=${editEmployee?._id}`, {
        method: 'PATCH',
        onSuccessQueryKey: 'fetchData', // This will invalidate all queries that start with 'fetchData'
    });

    const deleteEmployeeMutation = useDataMutation<Employee>(
        `/api/empl/delEmpl?id=${employeeToDelete?._id}`,
        {
            method: 'DELETE',
            onSuccessQueryKey: 'fetchData', // This will invalidate all queries that start with 'fetchData'
        }
    );

    const handleAddEmployee = (): void => {
        // Just initialize the form with empty values
        const newEmployee: Omit<EmployeeSubsetAdd, '_id'> = {
            name: '',
            email: '',
            password: '',
            phone: '',
            isAdmin: false,
        };
        setAddEmployee(newEmployee as Employee);
    };

    // Function to handle edit employee
    const handleEditClick = (employee: Employee): void => {
        setEditEmployee({ ...employee });
        setEditFormErrors(null);
    };

    // Function to save edited employee
    const handleSaveEdit = async (): Promise<void> => {
        if (editEmployee) {
            setEditFormErrors(null);
            setIsSubmitting(true);

            try {
                await editEmployeeMutation.mutateAsync(editEmployee);
                setEditEmployee(null);
                setShowSuccess(true);
            } catch (error) {
                console.error('Failed to edit employee:', error);
                setEditFormErrors(
                    typeof error === 'string'
                        ? error
                        : error instanceof Error
                        ? error.message
                        : 'Failed to edit employee'
                );
            } finally {
                // Make sure to reset the submitting state whether success or failure
                setIsSubmitting(false);
            }

            setEditEmployee(null);
        }
    };

    // Function to save added employee
    const handleSaveAdd = async (): Promise<void> => {
        if (addEmployee) {
            setFormErrors(null);
            setIsSubmitting(true);
            try {
                // console.log('addEmployee', addEmployee);
                // Call the API to create the employee
                await addEmployeeMutation.mutateAsync(addEmployee);
                setAddEmployee(null);
                setShowSuccess(true);
            } catch (error) {
                console.error('Failed to add employee:', error);
                setFormErrors(
                    typeof error === 'string'
                        ? error
                        : error instanceof Error
                        ? error.message
                        : 'Failed to add employee'
                );
            } finally {
                // Make sure to reset the submitting state whether success or failure
                setIsSubmitting(false);
            }
        }
    };

    // Function to handle delete employee
    const handleDeleteClick = (employee: Employee): void => {
        setEmployeeToDelete(employee);
        setShowDeleteModal(true);
    };

    // Function to confirm delete
    const confirmDelete = async (): Promise<void> => {
        if (employeeToDelete) {
            // setEmployees(
            //     employees.filter((emp) => emp._id !== employeeToDelete._id)
            // );
            await deleteEmployeeMutation.mutateAsync(employeeToDelete);
            setShowDeleteModal(false);
            setEmployeeToDelete(null);
        }
    };

    // Available departments and statuses for filters
    const Role: Employee['status'][] = ['Active', 'On Leave', 'Terminated'];

    // error handling
    if (isError) {
        return (
            <div className="bg-black min-h-screen">
                <div className="flex flex-col items-center justify-center h-screen">
                    <AlertCircle className="h-8 w-8 text-red-500" />
                    <h1 className="text-2xl font-bold text-white mt-4">
                        Something went wrong, please refresh the page
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen">
            {/* Header */}
            <div className="bg-red-600 shadow">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-white">
                        Employee Management Dashboard
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                {/* Filters and Search */}
                <div className="mb-6 bg-gray-800 p-4 rounded-lg shadow">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-red-500" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    placeholder="Search employees..."
                                    value={searchTerm}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Role Filter */}
                        <div className="w-full md:w-1/5">
                            <select
                                className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
                                value={statusFilter}
                                onChange={(
                                    e: React.ChangeEvent<HTMLSelectElement>
                                ) => setStatusFilter(e.target.value)}
                            >
                                <option value="">All Roles</option>
                                {Role.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Stats Overview */}
                <StatsOverview employees={emplData} />

                {/* Adding new employee */}
                <AddEmployeeSection handleAddEmployee={handleAddEmployee} />

                {/* Employee Table */}
                <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
                    {isLoading ? (
                        <div className="py-24 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mx-auto"></div>
                            <p className="mt-4 text-gray-300">
                                Loading employees...
                            </p>
                        </div>
                    ) : emplData.length === 0 ? (
                        <div className="py-24 text-center">
                            <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
                            <p className="mt-4 text-gray-300">
                                No employees found matching your criteria
                            </p>
                        </div>
                    ) : (
                        <EmployeesTableSection
                            employees={emplData}
                            handleEditClick={handleEditClick}
                            handleDeleteClick={handleDeleteClick}
                            getStatusBadgeColor={getStatusBadgeColor}
                        />
                    )}

                    {/* Pagination */}
                    <Pagination
                        emplCount={emplCount}
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />
                </div>
            </div>

            {/* Edit Employee Modal */}
            {editEmployee && (
                <EditEmployeeForm
                    employee={editEmployee}
                    isEditing={false}
                    onSave={handleSaveEdit}
                    onCancel={() => {
                        setEditEmployee(null);
                        setEditFormErrors(null);
                    }}
                    isSubmitting={isSubmitting}
                    error={editFormErrors}
                    setEmployee={setEditEmployee}
                />
            )}

            {/* Add Employee Modal */}
            {addEmployee && (
                <AddEmployeeForm
                    employee={addEmployee}
                    isEditing={false}
                    onSave={handleSaveAdd}
                    onCancel={() => {
                        setAddEmployee(null);
                        setFormErrors(null);
                    }}
                    isSubmitting={isSubmitting}
                    error={formErrors}
                    setEmployee={setAddEmployee}
                />
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && employeeToDelete && (
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
                            <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-900 sm:mx-0 sm:h-10 sm:w-10">
                                        <AlertCircle className="h-6 w-6 text-red-500" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-white">
                                            Delete Employee
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-300">
                                                Are you sure you want to delete{' '}
                                                {employeeToDelete.name}? This
                                                action cannot be undone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={confirmDelete}
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setEmployeeToDelete(null);
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* show success message */}
            {showSuccess && (
                <SuccessMessage
                    message="User has been successfully added!"
                    duration={5000}
                    onClose={() => setShowSuccess(false)}
                />
            )}
            {/* show error message */}
        </div>
    );
};

export default EmployeeDashboard;
