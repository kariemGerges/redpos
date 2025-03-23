'use client';
// pages/index.tsx
import React, { useState, useEffect } from 'react';
import {
    ShoppingCart,
    User,
    CreditCard,
    Trash2,
    Plus,
    Minus,
    Search,
    Tag,
    Barcode,
    Scan,
    Menu,
    Percent,
} from 'lucide-react';
import Image from 'next/image';
import { Product, CartItem } from '@/app/types';
import { useDataFetcher } from '@/app/hooks/useDataFetcher';
import IMG from '@/app/vegetables_opengraph.jpg'

// Categories and brands moved to constants
const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'Automotive', name: 'Automotive' },
    { id: 'Bakery', name: 'Bakery' },
    { id: 'Beauty', name: 'Beauty' },
    { id: 'Beverages', name: 'Beverages' },
    { id: 'Books', name: 'Books' },
    { id: 'Clothing', name: 'Clothing' },
    { id: 'Condiments', name: 'Condiments' },
    { id: 'Confectionery', name: 'Confectionery' },
    { id: 'Dairy', name: 'Dairy' },
    { id: 'Electronics', name: 'Electronics' },
    { id: 'Frozen Foods', name: 'Frozen Foods' },
    { id: 'Groceries', name: 'Groceries' },
    { id: 'Home & Kitchen', name: 'Home & Kitchen' },
    { id: 'Meat', name: 'Meat' },
    { id: 'Produce', name: 'Produce' },
    { id: 'Seafood', name: 'Seafood' },
    { id: 'Snacks', name: 'Snacks' },
    { id: 'Spices', name: 'Spices' },
    { id: 'Sports', name: 'Sports' },
    { id: 'Toys', name: 'Toys' },
];

const brands = [
    { id: 'all', name: 'All Brands' },
    { id: 'Al Fayhaa', name: 'Al Fayhaa' },
    { id: 'BlueStar', name: 'BlueStar' },
    { id: 'EasternDelight', name: 'Eastern Delight' },
    { id: 'Evergreen', name: 'Evergreen' },
    { id: 'FreshCo', name: 'FreshCo' },
    { id: 'Golden Eagle', name: 'Golden Eagle' },
    { id: 'GoodChoice', name: 'GoodChoice' },
    { id: 'Khalifa', name: 'Khalifa' },
    { id: 'Nile Harvest', name: 'Nile Harvest' },
    { id: 'Quality Goods', name: 'Quality Goods' },
    { id: 'Shamal Foods', name: 'Shamal Foods' },
    { id: 'StarLite', name: 'StarLite' },
    { id: 'SunSpice', name: 'SunSpice' },
    { id: 'Superior', name: 'Superior' },
    { id: 'Tastemaster', name: 'Tastemaster' },
];

export default function POS() {
    // Client-side states with lazy initialization
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeBrand, setActiveBrand] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [manualEntryMode, setManualEntryMode] = useState<
        'none' | 'price' | 'plu' | 'upc'
    >('none');
    const [manualEntryValue, setManualEntryValue] = useState('');
    const [manualEntryProductName, setManualEntryProductName] = useState('');
    const [showCouponMenu, setShowCouponMenu] = useState(false);
    const [appliedCoupons, setAppliedCoupons] = useState<
        Array<{ id: string; code: string; discount: number }>
    >([]);
    const [couponCode, setCouponCode] = useState('');

    // Fetch products from API
    const [filters, setFilters] = useState<Record<string, string | number>>({
        category: activeCategory !== 'all' ? activeCategory : '',
        brand: activeBrand !== 'all' ? activeBrand : '',
        name: searchTerm || '',
    });

    const [page, setPage] = useState(1);
    const limit = 16; // Products per page

    const { data, error, isLoading } = useDataFetcher('/api/products', {
        filters,
        page,
        limit,
    });

    console.log(data);

    // Update filters when selection changes
    useEffect(() => {
        setFilters({
            category: activeCategory !== 'all' ? activeCategory : '',
            brand: activeBrand !== 'all' ? activeBrand : '',
            name: searchTerm || '',
        });
    }, [activeCategory, activeBrand, searchTerm]);

    // Calculate totals - derived from cart
    const subtotal = cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    // Calculate discounts
    const totalDiscounts = appliedCoupons.reduce(
        (sum, coupon) => sum + coupon.discount,
        0
    );

    const total = subtotal - totalDiscounts;
    const tax = total * 0.07;
    const grandTotal = total + tax;

    // Handle category change
    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
        setPage(1); // Reset to first page
    };

    // Handle brand change
    const handleBrandChange = (brand: string) => {
        setActiveBrand(brand);
        setPage(1); // Reset to first page
    };

    // Handle search change
    const handleSearchChange = (search: string) => {
        setSearchTerm(search);
        setPage(1); // Reset to first page
    };

    // Add to cart
    const addToCart = (product: Product) => {
            const normalizedProduct = {
                id: product._id, // Use _id as id
                name: product.name,
                price: product.price,
                category: product.category,
                image: product.image || '/api/placeholder/80/80', // Use a placeholder if no image
            };
        const existingItemIndex = cart.findIndex(
            (item) => item.product.id === normalizedProduct.id
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
        setAppliedCoupons([]);
    };

    // Process payment
    const processPayment = () => {
        alert(`Processing payment for $${grandTotal.toFixed(2)}`);
        clearCart();
    };

    // Handle manual entry
    const handleManualEntry = () => {
        if (!manualEntryValue) return;

        if (manualEntryMode === 'price' && manualEntryProductName) {
            const price = parseFloat(manualEntryValue);
            if (!isNaN(price)) {
                // Create a custom product
                const customProduct: Product = {
                    id: Date.now(), // Generate a unique ID
                    name: manualEntryProductName,
                    price: price,
                    category: 'custom',
                    image: '/api/placeholder/80/80',
                };
                addToCart(customProduct);
            }
        } else if (manualEntryMode === 'plu') {
            // Here you would typically look up the PLU in your database
            // For demo purposes, we'll create a placeholder product
            const customProduct: Product = {
                id: Date.now(),
                name: `Product (PLU: ${manualEntryValue})`,
                price: 1.99, // Default price
                category: 'produce',
                image: '/api/placeholder/80/80',
            };
            addToCart(customProduct);
        } else if (manualEntryMode === 'upc') {
            // Here you would typically look up the UPC in your database
            // For demo purposes, we'll create a placeholder product
            const customProduct: Product = {
                id: Date.now(),
                name: `Product (UPC: ${manualEntryValue})`,
                price: 3.99, // Default price
                category: 'groceries',
                image: '/api/placeholder/80/80',
            };
            addToCart(customProduct);
        }

        // Reset the manual entry fields
        setManualEntryMode('none');
        setManualEntryValue('');
        setManualEntryProductName('');
    };

    // Apply coupon
    const applyCoupon = () => {
        if (!couponCode) return;

        // In a real app, you would validate this against your database
        // For demo purposes, we'll create a simple coupon
        const newCoupon = {
            id: Date.now().toString(),
            code: couponCode,
            discount: 2.0, // Fixed discount for demo
        };

        setAppliedCoupons([...appliedCoupons, newCoupon]);
        setCouponCode('');
        setShowCouponMenu(false);
    };

    // Remove coupon
    const removeCoupon = (couponId: string) => {
        setAppliedCoupons(
            appliedCoupons.filter((coupon) => coupon.id !== couponId)
        );
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
                    {/* Search and Manual Entry Options */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        {/* Search Bar */}
                        <div className="flex-grow relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={20} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 text-white"
                                value={searchTerm}
                                onChange={(e) =>
                                    handleSearchChange(e.target.value)
                                }
                            />
                        </div>

                        {/* Manual Entry Buttons */}
                        <div className="flex gap-2">
                            <button
                                className="p-3 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 flex items-center"
                                onClick={() =>
                                    setManualEntryMode((prev) =>
                                        prev === 'price' ? 'none' : 'price'
                                    )
                                }
                            >
                                <Tag size={20} className="mr-1" />
                                <span className="hidden md:inline">Price</span>
                            </button>
                            <button
                                className="p-3 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 flex items-center"
                                onClick={() =>
                                    setManualEntryMode((prev) =>
                                        prev === 'plu' ? 'none' : 'plu'
                                    )
                                }
                            >
                                <Scan size={20} className="mr-1" />
                                <span className="hidden md:inline">PLU</span>
                            </button>
                            <button
                                className="p-3 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 flex items-center"
                                onClick={() =>
                                    setManualEntryMode((prev) =>
                                        prev === 'upc' ? 'none' : 'upc'
                                    )
                                }
                            >
                                <Barcode size={20} className="mr-1" />
                                <span className="hidden md:inline">UPC</span>
                            </button>
                        </div>
                    </div>

                    {/* Manual Entry Form */}
                    {manualEntryMode !== 'none' && (
                        <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                            <h3 className="font-medium mb-3">
                                {manualEntryMode === 'price'
                                    ? 'Enter Custom Price'
                                    : manualEntryMode === 'plu'
                                    ? 'Enter PLU Code'
                                    : 'Enter UPC Code'}
                            </h3>
                            <div className="flex flex-col md:flex-row gap-3">
                                {manualEntryMode === 'price' && (
                                    <input
                                        type="text"
                                        placeholder="Product Name"
                                        className="flex-grow px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:border-red-500"
                                        value={manualEntryProductName}
                                        onChange={(e) =>
                                            setManualEntryProductName(
                                                e.target.value
                                            )
                                        }
                                    />
                                )}
                                <div className="flex-grow flex">
                                    {manualEntryMode === 'price' && (
                                        <div className="bg-gray-600 border-y border-l border-gray-500 rounded-l-lg px-3 flex items-center">
                                            $
                                        </div>
                                    )}
                                    <input
                                        type={
                                            manualEntryMode === 'price'
                                                ? 'number'
                                                : 'text'
                                        }
                                        step={
                                            manualEntryMode === 'price'
                                                ? '0.01'
                                                : undefined
                                        }
                                        placeholder={
                                            manualEntryMode === 'price'
                                                ? '0.00'
                                                : manualEntryMode === 'plu'
                                                ? 'Enter PLU'
                                                : 'Enter UPC'
                                        }
                                        className={`flex-grow px-4 py-2 bg-gray-600 border border-gray-500 focus:outline-none focus:border-red-500 ${
                                            manualEntryMode === 'price'
                                                ? 'rounded-r-lg'
                                                : 'rounded-lg'
                                        }`}
                                        value={manualEntryValue}
                                        onChange={(e) =>
                                            setManualEntryValue(e.target.value)
                                        }
                                    />
                                </div>
                                <button
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                    onClick={handleManualEntry}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Filter Toggle */}
                    <div className="mb-4">
                        <button
                            className="px-4 py-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 flex items-center"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <Menu size={20} className="mr-2" />
                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </button>
                    </div>

                    {/* Filters Section */}
                    {showFilters && (
                        <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                            <div className="mb-4">
                                <h3 className="font-medium mb-2">Categories</h3>
                                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            className={`px-3 py-1 rounded-full text-sm ${
                                                activeCategory === category.id
                                                    ? 'bg-red-600 text-white'
                                                    : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                                            }`}
                                            onClick={() =>
                                                handleCategoryChange(
                                                    category.id
                                                )
                                            }
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">Brands</h3>
                                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
                                    {brands.map((brand) => (
                                        <button
                                            key={brand.id}
                                            className={`px-3 py-1 rounded-full text-sm ${
                                                activeBrand === brand.id
                                                    ? 'bg-red-600 text-white'
                                                    : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                                            }`}
                                            onClick={() =>
                                                handleBrandChange(brand.id)
                                            }
                                        >
                                            {brand.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Products Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {isLoading ? (
                            // Loading placeholders
                            Array(8)
                                .fill(0)
                                .map((_, index) => (
                                    <div
                                        key={`loading-placeholder-${index}`}
                                        className="bg-gray-700 rounded-lg animate-pulse"
                                    >
                                        <div className="w-full h-20 bg-gray-800"></div>
                                        <div className="p-3">
                                            <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
                                            <div className="h-4 bg-gray-800 rounded w-1/4"></div>
                                        </div>
                                    </div>
                                ))
                        ) : error ? (
                            <div className="col-span-full text-center py-8 text-red-400">
                                Error loading products. Please try again.
                            </div>
                        ) : data &&
                            data.productsData &&
                            data.productsData.products &&
                            data.productsData.products.length > 0 ? (
                            data.productsData.products.map(
                                (product: Product) => (
                                    <div
                                        key={product._id}
                                        className="bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-600 transition"
                                        onClick={() => addToCart(product)}
                                    >
                                        {product.image ? (
                                            <Image
                                                width={150}
                                                height={150}
                                                src={IMG}
                                                alt={product.name}
                                                className="w-full h-20 object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-20 bg-gradient-to-t from-gray-700 to-gray-900"></div>
                                        )}
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
                                )
                            )
                        ) : (
                            <div className="col-span-full text-center py-8 text-gray-400">
                                No products found. Try changing your filters.
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {data && data.length > 0 && (
                        <div className="mt-6 flex justify-center">
                            <button
                                className="px-4 py-2 bg-gray-700 rounded-l-lg disabled:opacity-50"
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                            >
                                Previous
                            </button>
                            <div className="px-4 py-2 bg-gray-700 text-center">
                                Page {page}
                            </div>
                            <button
                                className="px-4 py-2 bg-gray-700 rounded-r-lg disabled:opacity-50"
                                disabled={data.length < limit}
                                onClick={() => setPage(page + 1)}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>

                {/* Cart Section */}
                <div className="bg-gray-800 rounded-lg p-4 flex flex-col h-full">
                    {/* Current Order & Options */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold flex items-center">
                            <ShoppingCart className="mr-2 text-red-500" />
                            Current Order
                        </h2>
                        <div className="flex space-x-2">
                            <button
                                className="p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 flex items-center"
                                onClick={() =>
                                    setShowCouponMenu(!showCouponMenu)
                                }
                            >
                                <Percent size={18} />
                            </button>
                            <button
                                className="p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
                                onClick={clearCart}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Coupon Menu */}
                    {showCouponMenu && (
                        <div className="mb-4 p-3 bg-gray-700 rounded-lg">
                            <h3 className="font-medium mb-2">
                                Apply Coupon or Discount
                            </h3>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Enter coupon code"
                                    className="flex-grow px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:border-red-500"
                                    value={couponCode}
                                    onChange={(e) =>
                                        setCouponCode(e.target.value)
                                    }
                                />
                                <button
                                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                    onClick={applyCoupon}
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Applied Coupons */}
                    {appliedCoupons.length > 0 && (
                        <div className="mb-4">
                            <h3 className="text-sm font-medium mb-2">
                                Applied Discounts:
                            </h3>
                            <div className="space-y-2">
                                {appliedCoupons.map((coupon) => (
                                    <div
                                        key={coupon.id}
                                        className="flex justify-between items-center bg-gray-700 px-3 py-2 rounded-lg"
                                    >
                                        <div>
                                            <span className="text-sm">
                                                {coupon.code}
                                            </span>
                                            <span className="text-red-400 ml-2">
                                                -${coupon.discount.toFixed(2)}
                                            </span>
                                        </div>
                                        <button
                                            className="text-gray-400 hover:text-white"
                                            onClick={() =>
                                                removeCoupon(coupon.id)
                                            }
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Cart Items */}
                    <div className="flex-grow overflow-y-auto mb-4 -mx-2 px-2 max-h-[700px] custom-scrollbar">
                        {cart.length === 0 ? (
                            <p className="text-gray-400 text-center py-8">
                                Your cart is empty
                            </p>
                        ) : (
                            <div className="space-y-2">
                                {cart.map((item) => (
                                    <div
                                        key={item.product._id}
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
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            {totalDiscounts > 0 && (
                                <div className="flex justify-between mb-2 text-red-400">
                                    <span>Discounts</span>
                                    <span>-${totalDiscounts.toFixed(2)}</span>
                                </div>
                            )}
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
