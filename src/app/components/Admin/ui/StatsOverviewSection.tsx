'use client';

import { UserRoundPlus } from 'lucide-react'
import { Employee } from '@/app/types';


interface StatsOverviewProps {
    employees: Employee[];
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ employees }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-gray-400 text-sm">Total Employees</p>
                        <h3 className="text-2xl font-bold text-white mt-1">
                            {employees?.length}
                        </h3>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-full">
                        <UserRoundPlus className="h-6 w-6 text-red-500" />
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-gray-400 text-sm">
                            Active Employees
                        </p>
                        <h3 className="text-2xl font-bold text-white mt-1">
                            {
                                // employees?.filter(
                                //     (emp) => emp.isActive === 'isActive'
                                // ).length
                                employees?.filter((emp) => emp.isActive === true)
                                    .length
                            }
                        </h3>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-full">
                        <div className="h-6 w-6 rounded-full bg-red-500"></div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-gray-400 text-sm">On Leave</p>
                        <h3 className="text-2xl font-bold text-white mt-1">
                            {
                                employees?.filter((emp) => emp.isActive === false)
                                    .length
                            }
                        </h3>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-full">
                        <div className="h-6 w-6 rounded-full bg-black border-2 border-red-500"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsOverview;
