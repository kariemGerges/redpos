import React, { useState, useEffect } from 'react';

interface SuccessMessageProps {
    message?: string;
    duration?: number;
    onClose?: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
    message = 'User has been successfully added!',
    duration = 5000,
    onClose,
}) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onClose) onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 flex items-center p-4 mb-4 rounded-lg shadow-lg bg-black bg-opacity-95 border-l-4 border-red-600 text-white max-w-md transition-all duration-300 ease-in-out">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-red-600 text-white">
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </div>
            <div className="ml-3 text-sm font-medium">{message}</div>
            <button
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-black text-red-500 rounded-lg focus:ring-2 focus:ring-red-600 p-1.5 hover:bg-red-900 inline-flex items-center justify-center h-8 w-8"
                onClick={() => {
                    setIsVisible(false);
                    if (onClose) onClose();
                }}
                aria-label="Close"
            >
                <span className="sr-only">Close</span>
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    ></path>
                </svg>
            </button>
        </div>
    );
};

export default SuccessMessage;