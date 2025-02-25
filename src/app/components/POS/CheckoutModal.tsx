// File: components/CheckoutModal.tsx
import React, { useState } from 'react';
import { CartItemType } from '@/app/types';
import { formatter } from '@/app/utils/currencyFormatter';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    cart: CartItemType[];
    total: number;
    onCompleteCheckout: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
    isOpen,
    onClose,
    cart,
    total,
    onCompleteCheckout,
}) => {
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
    const [amountTendered, setAmountTendered] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            onCompleteCheckout();
        }, 1500);
    };

    const change =
        paymentMethod === 'cash' && amountTendered
            ? parseFloat(amountTendered) - total
            : 0;

    return (
        <div className="fixed inset-0 bg-rose-950 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto">
                <div className="p-4 border-b">
                    <h2 className="text-2xl font-bold">Checkout</h2>
                </div>

                <div className="p-4">
                    <h3 className="font-bold mb-2">Order Summary</h3>
                    <div className="mb-4 max-h-64 overflow-auto">
                        {cart.map((item) => (
                            <div
                                key={item.product.id}
                                className="flex justify-between py-1 border-b"
                            >
                                <span>
                                    {item.quantity} x {item.product.name}
                                </span>
                                <span>
                                    {formatter.format(
                                        item.product.price * item.quantity
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="font-bold text-xl mb-4 flex justify-between">
                        <span>Total:</span>
                        <span>{formatter.format(total)}</span>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <fieldset className="mb-4">
                            <legend className="font-bold mb-2">
                                Payment Method
                            </legend>
                            <div className="flex gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cash"
                                        checked={paymentMethod === 'cash'}
                                        onChange={() =>
                                            setPaymentMethod('cash')
                                        }
                                        className="mr-2"
                                    />
                                    Cash
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="card"
                                        checked={paymentMethod === 'card'}
                                        onChange={() =>
                                            setPaymentMethod('card')
                                        }
                                        className="mr-2"
                                    />
                                    Card
                                </label>
                            </div>
                        </fieldset>

                        {paymentMethod === 'cash' && (
                            <>
                                <div className="mb-4">
                                    <label className="block font-bold mb-1">
                                        Amount Tendered
                                    </label>
                                    <input
                                        type="number"
                                        value={amountTendered}
                                        onChange={(e) =>
                                            setAmountTendered(e.target.value)
                                        }
                                        min={total.toFixed(2)}
                                        step="0.01"
                                        required
                                        className="w-full p-2 border rounded"
                                    />
                                </div>

                                {parseFloat(amountTendered) >= total && (
                                    <div className="mb-4 p-2 bg-gray-100 rounded">
                                        <div className="flex justify-between font-bold">
                                            <span>Change:</span>
                                            <span>
                                                {formatter.format(change)}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border rounded"
                                disabled={isProcessing}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-blue-400"
                                disabled={
                                    isProcessing ||
                                    (paymentMethod === 'cash' &&
                                        (parseFloat(amountTendered) < total ||
                                            !amountTendered))
                                }
                            >
                                {isProcessing
                                    ? 'Processing...'
                                    : 'Complete Payment'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
