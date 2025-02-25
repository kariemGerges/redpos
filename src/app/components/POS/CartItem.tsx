// File: components/CIaemrtt.tsx;
import React from 'react';
import Image from 'next/image';
import { CartItemType } from '@/app/types';
import { formatter } from '@/app/utils/currencyFormatter';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (productId: string, quantity: number) => void;
    onRemove: (productId: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
    item,
    onUpdateQuantity,
    onRemove,
}) => {
    const { product, quantity } = item;

    return (
        <div className="flex items-center p-2 border rounded">
            <Image
                src={product.imageUrl}
                alt={product.name}
                width={150}
                height={150}
                className="w-12 h-12 object-cover rounded mr-3"
            />
            <div className="flex-grow">
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-sm text-gray-600">
                    {formatter.format(product.price)}
                </p>
            </div>
            <div className="flex items-center">
                <button
                    onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-l"
                >
                    -
                </button>
                <span className="w-8 h-8 flex items-center justify-center bg-gray-100">
                    {quantity}
                </span>
                <button
                    onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-r"
                >
                    +
                </button>
                <button
                    onClick={() => onRemove(product.id)}
                    className="ml-2 text-red-500 p-1"
                >
                    ×
                </button>
            </div>
        </div>
    );
};
