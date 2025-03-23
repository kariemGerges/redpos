import { Edit, Trash2, Info } from 'lucide-react';
import { Employee } from '@/app/types';
import { useState } from 'react';

interface EmployeeTableProps {
    employees: Employee[];
    handleEditClick: (employee: Employee) => void;
    handleDeleteClick: (employee: Employee) => void;
    getStatusBadgeColor: (status: Employee['status']) => string;
}

const EmployeesTableSection: React.FC<EmployeeTableProps> = ({
    employees,
    handleEditClick,
    handleDeleteClick,
    getStatusBadgeColor,
}) => {
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
        null
    );
    const [showModal, setShowModal] = useState(false);

    // Function to open the modal with employee details
    const openEmployeeDetailsModal = (employee: Employee) => {
        setSelectedEmployee(employee);
        setShowModal(true);
    };

    // Format date to a more readable format
    const formatDate = (dateInput: string | Date | undefined | null) => {
        if (!dateInput) return 'N/A';
        const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
        return date.toLocaleString();
    };

    return (
        <div className="overflow-x-auto relative">
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
                            className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                        >
                            Employee ID
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
                        <tr
                            key={employee._id}
                            className="hover:bg-gray-700 transition-colors duration-150"
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-white">
                                    {employee.name}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-300">
                                    {employee.employeeId}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-300">
                                    {employee.email}
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
                                        employee.isActive
                                            ? 'Active'
                                            : 'Terminated'
                                    )}`}
                                >
                                    {employee.isActive
                                        ? 'Active'
                                        : 'Terminated'}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => handleEditClick(employee)}
                                    className="text-red-400 hover:text-red-300 mr-3"
                                >
                                    <Edit className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(employee)}
                                    className="text-red-800 hover:text-red-700"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>

                                {/* Info button to open modal */}
                                <button
                                    onClick={() =>
                                        openEmployeeDetailsModal(employee)
                                    }
                                    className="text-blue-400 hover:text-blue-300 ml-3"
                                    aria-label="View more information"
                                >
                                    <Info className="h-5 w-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Employee Details Modal */}
            {showModal && selectedEmployee && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-white">
                                {selectedEmployee.name} - Details
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="border-b border-gray-700 pb-2">
                                <h4 className="text-sm font-medium text-gray-400">
                                    Contact Information
                                </h4>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    <div className="text-sm font-medium text-gray-400">
                                        Email:
                                    </div>
                                    <div className="text-sm text-white">
                                        {selectedEmployee.email}
                                    </div>
                                    <div className="text-sm font-medium text-gray-400">
                                        Phone:
                                    </div>
                                    <div className="text-sm text-white">
                                        {selectedEmployee.phone || 'N/A'}
                                    </div>
                                </div>
                            </div>

                            <div className="border-b border-gray-700 pb-2">
                                <h4 className="text-sm font-medium text-gray-400">
                                    Account Status
                                </h4>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    <div className="text-sm font-medium text-gray-400">
                                        Employment:
                                    </div>
                                    <div className="text-sm text-white">
                                        <span
                                            className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${getStatusBadgeColor(
                                                selectedEmployee.isActive
                                                    ? 'Active'
                                                    : 'Terminated'
                                            )}`}
                                        >
                                            {selectedEmployee.isActive
                                                ? 'Active'
                                                : 'Terminated'}
                                        </span>
                                    </div>
                                    <div className="text-sm font-medium text-gray-400">
                                        Role:
                                    </div>
                                    <div className="text-sm text-white">
                                        {selectedEmployee.role}
                                    </div>
                                    <div className="text-sm font-medium text-gray-400">
                                        Currently Logged In:
                                    </div>
                                    <div className="text-sm text-white">
                                        {selectedEmployee.isLogin
                                            ? 'Yes'
                                            : 'No'}
                                    </div>
                                    <div className="text-sm font-medium text-gray-400">
                                        Banned:
                                    </div>
                                    <div className="text-sm text-white">
                                        {selectedEmployee.isBanned
                                            ? 'Yes'
                                            : 'No'}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-400">
                                    Activity Information
                                </h4>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    <div className="text-sm font-medium text-gray-400">
                                        Created At:
                                    </div>
                                    <div className="text-sm text-white">
                                        {formatDate(selectedEmployee.createdAt)}
                                    </div>
                                    <div className="text-sm font-medium text-gray-400">
                                        Updated At:
                                    </div>
                                    <div className="text-sm text-white">
                                        {formatDate(selectedEmployee.updatedAt)}
                                    </div>
                                    <div className="text-sm font-medium text-gray-400">
                                        Last Login:
                                    </div>
                                    <div className="text-sm text-white">
                                        {formatDate(selectedEmployee.lastLogin)}
                                    </div>
                                    {selectedEmployee.deletedAt && (
                                        <>
                                            <div className="text-sm font-medium text-gray-400">
                                                Deleted At:
                                            </div>
                                            <div className="text-sm text-white">
                                                {formatDate(
                                                    selectedEmployee.deletedAt
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded focus:outline-none"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeesTableSection;
