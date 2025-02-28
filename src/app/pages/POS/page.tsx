'use client';
// pages/index.tsx
import React, { useState } from 'react';
import {
    ShoppingCart,
    User,
    CreditCard,
    Trash2,
    Plus,
    Minus,
    Search,
} from 'lucide-react';
import Image from 'next/image';

// Type definitions
type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
};

type CartItem = {
    product: Product;
    quantity: number;
};

// Mock data - defined outside component to avoid hydration mismatch
const mockProducts: Product[] = [
    {
        id: 1,
        name: 'Espresso',
        price: 3.5,
        category: 'coffee',
        image: '/api/placeholder/80/80',
    },
    {
        id: 2,
        name: 'Cappuccino',
        price: 4.5,
        category: 'coffee',
        image: '/api/placeholder/80/80',
    },
    {
        id: 3,
        name: 'Latte',
        price: 4.75,
        category: 'coffee',
        image: '/api/placeholder/80/80',
    },
    {
        id: 4,
        name: 'Mocha',
        price: 5.25,
        category: 'coffee',
        image: '/api/placeholder/80/80',
    },
    {
        id: 5,
        name: 'Croissant',
        price: 3.25,
        category: 'pastry',
        image: '/api/placeholder/80/80',
    },
    {
        id: 6,
        name: 'Blueberry Muffin',
        price: 3.75,
        category: 'pastry',
        image: '/api/placeholder/80/80',
    },
    {
        id: 7,
        name: 'Chocolate Chip Cookie',
        price: 2.5,
        category: 'pastry',
        image: '/api/placeholder/80/80',
    },
    {
        id: 8,
        name: 'Turkey Sandwich',
        price: 8.25,
        category: 'food',
        image: '/api/placeholder/80/80',
    },
    {
        id: 9,
        name: 'Veggie Wrap',
        price: 7.5,
        category: 'food',
        image: '/api/placeholder/80/80',
    },
    {
        id: 10,
        name: 'Caesar Salad',
        price: 9.25,
        category: 'food',
        image: '/api/placeholder/80/80',
    },
    {
        id: 11,
        name: 'Sparkling Water',
        price: 2.75,
        category: 'drinks',
        image: '/api/placeholder/80/80',
    },
    {
        id: 12,
        name: 'Orange Juice',
        price: 3.95,
        category: 'drinks',
        image: '/api/placeholder/80/80',
    },
];

// Categories - defined outside component
const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'coffee', name: 'Coffee' },
    { id: 'pastry', name: 'Pastries' },
    { id: 'food', name: 'Food' },
    { id: 'drinks', name: 'Drinks' },
];

export default function POS() {
    // Client-side states
    const [products] = useState<Product[]>(mockProducts);
    const [filteredProducts, setFilteredProducts] =
        useState<Product[]>(mockProducts);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    // Calculate total - derived from cart
    const total = cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
    const tax = total * 0.07;
    const grandTotal = total + tax;

    // Filter products - function called on demand
    const filterProducts = (category: string, search: string) => {
        let filtered = products;

        // Filter by category
        if (category !== 'all') {
            filtered = filtered.filter(
                (product) => product.category === category
            );
        }

        // Filter by search term
        if (search) {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    };

    // Handle category change
    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
        filterProducts(category, searchTerm);
    };

    // Handle search change
    const handleSearchChange = (search: string) => {
        setSearchTerm(search);
        filterProducts(activeCategory, search);
    };

    // Add to cart
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

    // Remove from cart
    const removeFromCart = (productId: number) => {
        setCart(cart.filter((item) => item.product.id !== productId));
    };

    // Update quantity
    const updateQuantity = (productId: number, change: number) => {
        const existingItemIndex = cart.findIndex(
            (item) => item.product.id === productId
        );

        if (existingItemIndex > -1) {
            const updatedCart = [...cart];
            const newQuantity =
                updatedCart[existingItemIndex].quantity + change;

            if (newQuantity <= 0) {
                updatedCart.splice(existingItemIndex, 1);
            } else {
                updatedCart[existingItemIndex].quantity = newQuantity;
            }

            setCart(updatedCart);
        }
    };

    // Clear cart
    const clearCart = () => {
        setCart([]);
    };

    // Process payment (mock)
    const processPayment = () => {
        alert(`Processing payment for $${grandTotal.toFixed(2)}`);
        clearCart();
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <header className="bg-black p-4 shadow">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl md:text-2xl font-bold text-red-500">
                        FreshMart
                    </h1>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition">
                            <User size={20} />
                        </button>
                        <span className="hidden md:inline">
                            Staff: John Doe
                        </span>
                    </div>
                </div>
            </header>

            <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Product Section */}
                <div className="lg:col-span-2 bg-gray-800 rounded-lg p-4">
                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={20} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 text-white"
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                        />
                    </div>

                    {/* Categories */}
                    <div className="mb-6 flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`px-4 py-2 rounded-full text-sm ${
                                    activeCategory === category.id
                                        ? 'bg-red-600 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                                onClick={() =>
                                    handleCategoryChange(category.id)
                                }
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-600 transition"
                                onClick={() => addToCart(product)}
                            >
                                <Image
                                    width={150}
                                    height={150}
                                    src={product.image}
                                    alt={product.name}
                                    // className="w-full h-20 object-cover"
                                />
                                <div className="p-3">
                                    <h3 className="text-sm font-medium truncate">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-red-400">
                                            ${product.price.toFixed(2)}
                                        </span>
                                        <button className="p-1 bg-red-600 rounded-full hover:bg-red-700">
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cart Section */}
                <div className="bg-gray-800 rounded-lg p-4 flex flex-col h-full">
                    {/* Current Order */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold flex items-center">
                            <ShoppingCart className="mr-2 text-red-500" />
                            Current Order
                        </h2>
                        <button
                            className="p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
                            onClick={clearCart}
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-grow overflow-y-auto mb-4 -mx-2 px-2 max-h-[600px] custom-scrollbar">
                        {cart.length === 0 ? (
                            <p className="text-gray-400 text-center py-8">
                                Your cart is empty
                            </p>
                        ) : (
                            <div className="space-y-2">
                                {cart.map((item) => (
                                    <div
                                        key={item.product.id}
                                        className="bg-gray-700 p-3 rounded-lg flex justify-between"
                                    >
                                        <div className="flex-grow">
                                            <div className="flex justify-between">
                                                <h3 className="font-medium">
                                                    {item.product.name}
                                                </h3>
                                                <span className="text-red-400">
                                                    $
                                                    {(
                                                        item.product.price *
                                                        item.quantity
                                                    ).toFixed(2)}
                                                </span>
                                            </div>
                                            <div className="flex items-center mt-2">
                                                <button
                                                    className="p-1 bg-gray-600 rounded-md hover:bg-gray-500"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.product.id,
                                                            -1
                                                        )
                                                    }
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="mx-2 min-w-8 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    className="p-1 bg-gray-600 rounded-md hover:bg-gray-500"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.product.id,
                                                            1
                                                        )
                                                    }
                                                >
                                                    <Plus size={14} />
                                                </button>
                                                <span className="ml-3 text-gray-400 text-sm">
                                                    $
                                                    {item.product.price.toFixed(
                                                        2
                                                    )}{' '}
                                                    each
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            className="ml-3 p-1 self-center text-gray-400 hover:text-white"
                                            onClick={() =>
                                                removeFromCart(item.product.id)
                                            }
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Total and Checkout */}
                    <div className="mt-auto">
                        <div className="border-t border-gray-700 pt-4 pb-4">
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Tax (7%)</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span className="text-red-500">
                                    ${grandTotal.toFixed(2)}
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <button className="p-3 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition flex items-center justify-center">
                                Hold Order
                            </button>
                            <button
                                className="p-3 bg-red-600 rounded-lg text-white hover:bg-red-700 transition flex items-center justify-center"
                                onClick={processPayment}
                                disabled={cart.length === 0}
                            >
                                <CreditCard className="mr-2" />
                                Pay Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
