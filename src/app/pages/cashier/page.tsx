// File: app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ProductCard } from '@/app/components/POS/ProductCard';
import { CartItem } from '@/app/components/POS/CartItem';
import { CheckoutModal } from '@/app/components/POS/CheckoutModal';
import { Product, CartItemType } from '@/app/types';
import { formatter } from '@/app/utils/currencyFormatter';

export default function POSPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartItemType[]>([]);
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // In a real app, fetch from API
        const dummyProducts: Product[] = [
            {
                id: '1',
                name: 'Coffee',
                price: 3.99,
                category: 'Beverages',
                imageUrl: '/api/placeholder/150/150',
                
            },
            {
                id: '2',
                name: 'Sandwich',
                price: 7.99,
                category: 'Food',
                imageUrl: '/api/placeholder/150/150',
            },
            {
                id: '3',
                name: 'Muffin',
                price: 2.99,
                category: 'Bakery',
                imageUrl: '/api/placeholder/150/150',
            },
            {
                id: '4',
                name: 'Salad',
                price: 8.99,
                category: 'Food',
                imageUrl: '/api/placeholder/150/150',
            },
            {
                id: '5',
                name: 'Tea',
                price: 2.99,
                category: 'Beverages',
                imageUrl: '/api/placeholder/150/150',
            },
            {
                id: '6',
                name: 'Croissant',
                price: 3.49,
                category: 'Bakery',
                imageUrl: '/api/placeholder/150/150',
            },
            {
                id: '7',
                name: 'Smoothie',
                price: 5.99,
                category: 'Beverages',
                imageUrl: '/api/placeholder/150/150',
            },
            {
                id: '8',
                name: 'Bagel',
                price: 2.99,
                category: 'Bakery',
                imageUrl: '/api/placeholder/150/150',
            },
        ];

        setProducts(dummyProducts);
        setIsLoading(false);
    }, []);

    const addToCart = (product: Product) => {
        const existingItemIndex = cart.findIndex(
            (item) => item.product.id === product.id
        );

        if (existingItemIndex > -1) {
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity += 1;
            setCart(updatedCart);
        } else {
            setCart([...cart, { product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId: string) => {
        setCart(cart.filter((item) => item.product.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        const updatedCart = cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
        );

        setCart(updatedCart);
    };

    const clearCart = () => {
        setCart([]);
    };

    const handleCheckout = () => {
        setIsCheckoutModalOpen(true);
    };

    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const cartTotal = cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    const categories = [
        ...new Set(products.map((product) => product.category)),
    ];

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100">
            {/* Products Section */}
            <div className="w-full md:w-2/3 p-4 overflow-auto">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full p-2 border border-gray-300 rounded"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-xl">Loading products...</p>
                    </div>
                ) : (
                    <>
                        {categories.map((category) => (
                            <div key={category} className="mb-6">
                                <h2 className="text-xl font-bold mb-2">
                                    {category}
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {filteredProducts
                                        .filter(
                                            (product) =>
                                                product.category === category
                                        )
                                        .map((product) => (
                                            <ProductCard
                                                key={product.id}
                                                product={product}
                                                onAddToCart={addToCart}
                                            />
                                        ))}
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>

            {/* Cart Section */}
            <div className="w-full md:w-1/3 bg-white p-4 shadow-lg flex flex-col">
                <h2 className="text-2xl font-bold mb-4">Cart</h2>

                <div className="flex-grow overflow-auto">
                    {cart.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">
                            Your cart is empty
                        </p>
                    ) : (
                        <div className="space-y-2">
                            {cart.map((item) => (
                                <CartItem
                                    key={item.product.id}
                                    item={item}
                                    onUpdateQuantity={updateQuantity}
                                    onRemove={removeFromCart}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="border-t mt-4 pt-4">
                    <div className="flex justify-between text-lg font-bold mb-4">
                        <span>Total:</span>
                        <span>{formatter.format(cartTotal)}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={clearCart}
                            disabled={cart.length === 0}
                            className="bg-gray-200 text-gray-800 py-2 rounded disabled:opacity-50"
                        >
                            Clear
                        </button>
                        <button
                            onClick={handleCheckout}
                            disabled={cart.length === 0}
                            className="bg-blue-600 text-white py-2 rounded disabled:opacity-50"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>

            {/* Checkout Modal */}
            <CheckoutModal
                isOpen={isCheckoutModalOpen}
                onClose={() => setIsCheckoutModalOpen(false)}
                cart={cart}
                total={cartTotal}
                onCompleteCheckout={() => {
                    setIsCheckoutModalOpen(false);
                    clearCart();
                }}
            />
        </div>
    );
}
// const POSPage = () => {
//     return (
//         <div>
//             hi
//         </div>
//     );
// };

// export default POSPage;