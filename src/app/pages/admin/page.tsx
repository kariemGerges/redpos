'use client';
import React, { useState, useEffect } from 'react';
import {
    Search,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    AlertCircle,
} from 'lucide-react';

// TypeScript interfaces
interface Employee {
    id: number;
    name: string;
    email: string;
    department: string;
    role: string;
    status: 'Active' | 'On Leave' | 'Terminated';
}

// Mock data for demonstration
const mockEmployees: Employee[] = [
    {
        id: 1,
        name: 'Jane Smith',
        email: 'jane.smith@company.com',
        department: 'Engineering',
        role: 'Senior Developer',
        status: 'Active',
    },
    {
        id: 2,
        name: 'John Doe',
        email: 'john.doe@company.com',
        department: 'Marketing',
        role: 'Marketing Manager',
        status: 'Active',
    },
    {
        id: 3,
        name: 'Alice Johnson',
        email: 'alice.johnson@company.com',
        department: 'HR',
        role: 'HR Specialist',
        status: 'On Leave',
    },
    {
        id: 4,
        name: 'Robert Williams',
        email: 'robert.williams@company.com',
        department: 'Sales',
        role: 'Sales Representative',
        status: 'Active',
    },
    {
        id: 5,
        name: 'Emily Brown',
        email: 'emily.brown@company.com',
        department: 'Engineering',
        role: 'QA Engineer',
        status: 'Active',
    },
];

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
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [departmentFilter, setDepartmentFilter] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
        null
    );

    // Mock API call to fetch employees with pagination and filters
    useEffect(() => {
        const fetchEmployees = () => {
            setLoading(true);

            // Simulate API response with mock data
            setTimeout(() => {
                let filteredData = [...mockEmployees];

                if (searchTerm) {
                    filteredData = filteredData.filter(
                        (emp) =>
                            emp.name
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase()) ||
                            emp.email
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                    );
                }

                if (departmentFilter) {
                    filteredData = filteredData.filter(
                        (emp) => emp.department === departmentFilter
                    );
                }

                if (statusFilter) {
                    filteredData = filteredData.filter(
                        (emp) =>
                            emp.status === (statusFilter as Employee['status'])
                    );
                }

                setEmployees(filteredData);
                setTotalPages(Math.ceil(filteredData.length / 5) || 1);
                setLoading(false);
            }, 500);
        };

        fetchEmployees();
    }, [currentPage, searchTerm, departmentFilter, statusFilter]);

    // Function to handle edit employee
    const handleEditClick = (employee: Employee): void => {
        setEditEmployee({ ...employee });
    };

    // Function to save edited employee
    const handleSaveEdit = (): void => {
        if (editEmployee) {
            setEmployees(
                employees.map((emp) =>
                    emp.id === editEmployee.id ? editEmployee : emp
                )
            );
            setEditEmployee(null);
        }
    };

    // Function to handle delete employee
    const handleDeleteClick = (employee: Employee): void => {
        setEmployeeToDelete(employee);
        setShowDeleteModal(true);
    };

    // Function to confirm delete
    const confirmDelete = (): void => {
        if (employeeToDelete) {
            setEmployees(
                employees.filter((emp) => emp.id !== employeeToDelete.id)
            );
            setShowDeleteModal(false);
            setEmployeeToDelete(null);
        }
    };

    // Available departments and statuses for filters
    const departments: string[] = ['Engineering', 'Marketing', 'HR', 'Sales'];
    const statuses: Employee['status'][] = ['Active', 'On Leave', 'Terminated'];

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

                        <div className="w-full md:w-1/5">
                            <select
                                className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
                                value={departmentFilter}
                                onChange={(
                                    e: React.ChangeEvent<HTMLSelectElement>
                                ) => setDepartmentFilter(e.target.value)}
                            >
                                <option value="">All Departments</option>
                                {departments.map((dept) => (
                                    <option key={dept} value={dept}>
                                        {dept}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="w-full md:w-1/5">
                            <select
                                className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
                                value={statusFilter}
                                onChange={(
                                    e: React.ChangeEvent<HTMLSelectElement>
                                ) => setStatusFilter(e.target.value)}
                            >
                                <option value="">All Statuses</option>
                                {statuses.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Employee Table */}
                <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
                    {loading ? (
                        <div className="py-24 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mx-auto"></div>
                            <p className="mt-4 text-gray-300">
                                Loading employees...
                            </p>
                        </div>
                    ) : employees.length === 0 ? (
                        <div className="py-24 text-center">
                            <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
                            <p className="mt-4 text-gray-300">
                                No employees found matching your criteria
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-600">
                                <thead className="bg-gray-700">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        >
                                            Department
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        >
                                            Role
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        >
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-800 divide-y divide-gray-600">
                                    {employees.map((employee: Employee) => (
                                        <tr key={employee.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-white">
                                                    {employee.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-300">
                                                    {employee.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-300">
                                                    {employee.department}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-300">
                                                    {employee.role}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(
                                                        employee.status
                                                    )}`}
                                                >
                                                    {employee.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() =>
                                                        handleEditClick(
                                                            employee
                                                        )
                                                    }
                                                    className="text-red-400 hover:text-red-300 mr-3"
                                                >
                                                    <Edit className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            employee
                                                        )
                                                    }
                                                    className="text-red-800 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-600 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.max(prev - 1, 1)
                                    )
                                }
                                disabled={currentPage === 1}
                                className={`${
                                    currentPage === 1
                                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                } relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md`}
                            >
                                Previous
                            </button>
                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(prev + 1, totalPages)
                                    )
                                }
                                disabled={currentPage === totalPages}
                                className={`${
                                    currentPage === totalPages
                                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                } ml-3 relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md`}
                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-300">
                                    Showing{' '}
                                    <span className="font-medium">
                                        {employees.length}
                                    </span>{' '}
                                    results
                                </p>
                            </div>
                            <div>
                                <nav
                                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                    aria-label="Pagination"
                                >
                                    <button
                                        onClick={() =>
                                            setCurrentPage((prev) =>
                                                Math.max(prev - 1, 1)
                                            )
                                        }
                                        disabled={currentPage === 1}
                                        className={`${
                                            currentPage === 1
                                                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                        } relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-600 text-sm font-medium`}
                                    >
                                        <span className="sr-only">
                                            Previous
                                        </span>
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>

                                    {[...Array(totalPages)].map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setCurrentPage(index + 1)
                                            }
                                            className={`${
                                                currentPage === index + 1
                                                    ? 'bg-red-600 border-red-600 text-white'
                                                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                                            } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() =>
                                            setCurrentPage((prev) =>
                                                Math.min(prev + 1, totalPages)
                                            )
                                        }
                                        disabled={currentPage === totalPages}
                                        className={`${
                                            currentPage === totalPages
                                                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                        } relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-600 text-sm font-medium`}
                                    >
                                        <span className="sr-only">Next</span>
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Employee Modal */}
            {editEmployee && (
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
                                <h3 className="text-lg leading-6 font-medium text-white mb-4">
                                    Edit Employee
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-300"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-800 text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
                                            value={editEmployee.name}
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) =>
                                                setEditEmployee({
                                                    ...editEmployee,
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-300"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-800 text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
                                            value={editEmployee.email}
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) =>
                                                setEditEmployee({
                                                    ...editEmployee,
                                                    email: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="department"
                                            className="block text-sm font-medium text-gray-300"
                                        >
                                            Department
                                        </label>
                                        <select
                                            id="department"
                                            className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-800 text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
                                            value={editEmployee.department}
                                            onChange={(
                                                e: React.ChangeEvent<HTMLSelectElement>
                                            ) =>
                                                setEditEmployee({
                                                    ...editEmployee,
                                                    department: e.target.value,
                                                })
                                            }
                                        >
                                            {departments.map((dept) => (
                                                <option key={dept} value={dept}>
                                                    {dept}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="role"
                                            className="block text-sm font-medium text-gray-300"
                                        >
                                            Role
                                        </label>
                                        <input
                                            type="text"
                                            id="role"
                                            className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-800 text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
                                            value={editEmployee.role}
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) =>
                                                setEditEmployee({
                                                    ...editEmployee,
                                                    role: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="status"
                                            className="block text-sm font-medium text-gray-300"
                                        >
                                            Status
                                        </label>
                                        <select
                                            id="status"
                                            className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-800 text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
                                            value={editEmployee.status}
                                            onChange={(
                                                e: React.ChangeEvent<HTMLSelectElement>
                                            ) =>
                                                setEditEmployee({
                                                    ...editEmployee,
                                                    status: e.target
                                                        .value as Employee['status'],
                                                })
                                            }
                                        >
                                            {statuses.map((status) => (
                                                <option
                                                    key={status}
                                                    value={status}
                                                >
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleSaveEdit}
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setEditEmployee(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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
        </div>
    );
};

export default EmployeeDashboard;
