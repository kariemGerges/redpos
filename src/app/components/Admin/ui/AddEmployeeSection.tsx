import { UserRoundPlus} from 'lucide-react'

interface AddEmployeeSectionProps {
    handleAddEmployee: () => void;
}

const AddEmployeeSection: React.FC<AddEmployeeSectionProps> = ({ handleAddEmployee }) => {
    return (
        <div className="mb-6 bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex flex-col items-center md:flex-row md:justify-between">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-xl font-semibold text-white">
                        Team Management
                    </h2>
                    <p className="text-gray-400 mt-1">Add new employees</p>
                </div>
                <button
                    onClick={() => handleAddEmployee()}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                    <UserRoundPlus className="h-5 w-5 mr-2" />
                    <span>Add New Employee</span>
                </button>
            </div>
        </div>
    );
}

export default AddEmployeeSection;