// File: components/ProductCard.tsx
import React from 'react';
import Image from 'next/image';
import { Product } from '@/app/types';
import { formatter } from '@/app/utils/currencyFormatter';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onAddToCart,
}) => {
    return (
        <div className="rounded shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Image
                width={150}
                height={150}
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-32 object-cover"
            />
            <div className="p-3">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-gray-600">
                    {formatter.format(product.price)}
                </p>
                <button
                    onClick={() => onAddToCart(product)}
                    className="mt-2 w-full bg-blue-600  py-1 rounded hover:bg-blue-700 transition-colors"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};
