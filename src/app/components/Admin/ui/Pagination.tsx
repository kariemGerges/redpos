import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useState } from 'react';



interface PaginationProps {
    emplCount: number;
    currentPage: number;
    totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    emplCount,
}) => {
    const [Page, setPage] = useState<number>(1);

    console.log('currentPage', Page);

    return (
        <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-600 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
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
                        setPage((prev) => Math.min(prev + 1, totalPages))
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
                        Showing <span className="font-medium">{emplCount}</span>{' '}
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
                                setPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={currentPage === 1}
                            className={`${
                                currentPage === 1
                                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            } relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-600 text-sm font-medium`}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setPage(index + 1)}
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
                                setPage((prev) =>
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
    );
};

export default Pagination;