import React, { useState } from 'react';

interface PinPadProps {
    onPinComplete: (pin: string) => void;
    maxLength?: number;
}

const PinPad: React.FC<PinPadProps> = ({ onPinComplete, maxLength = 4 }) => {
    const [pin, setPin] = useState<string>('');

    const handleNumberClick = (number: number) => {
        if (pin.length < maxLength) {
            const newPin = pin + number;
            setPin(newPin);
        }
    };

    const handleDelete = () => {
        setPin(pin.slice(0, -1));
    };

    const handleEnter = () => {
        if (pin.length > 0) {
            onPinComplete(pin);
        }
    };

    const clearPin = () => {
        setPin('');
    };

    return (
        <div className="w-full max-w-md mx-auto">
            {/* PIN Display */}
            <div className="mb-4 text-center">
                <div className="bg-gray-100 p-4 rounded-md">
                    <div className="flex justify-center space-x-2">
                        {Array(maxLength)
                            .fill(0)
                            .map((_, index) => (
                                <div
                                    key={index}
                                    className="w-3 h-3 rounded-full border-2 border-gray-400"
                                    style={{
                                        backgroundColor:
                                            index < pin.length
                                                ? '#000'
                                                : 'transparent',
                                    }}
                                />
                            ))}
                    </div>
                </div>
            </div>

            {/* Number Pad */}
            <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                    <button
                        key={number}
                        onClick={() => handleNumberClick(number)}
                        className="bg-gray-200 hover:bg-gray-300 text-black py-4 rounded-md text-xl font-semibold transition-colors"
                    >
                        {number}
                    </button>
                ))}
                <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white py-4 rounded-md text-xl font-semibold transition-colors"
                >
                    Del
                </button>
                <button
                    onClick={() => handleNumberClick(0)}
                    className="bg-gray-200 hover:bg-gray-300 text-black py-4 rounded-md text-xl font-semibold transition-colors"
                >
                    0
                </button>
                <button
                    onClick={handleEnter}
                    className="bg-green-500 hover:bg-green-600 text-white py-4 rounded-md text-xl font-semibold transition-colors"
                >
                    Enter
                </button>
            </div>

            {/* Clear button */}
            <div className="mt-4">
                <button
                    onClick={clearPin}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors"
                >
                    Clear
                </button>
            </div>
        </div>
    );
};

export default PinPad;
