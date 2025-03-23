// File: types.ts
export type Product = {
    _id: number;
    name: string;
    price: number;
    category: string;
    image: string;
};

export type CartItem = {
    product: Product;
    quantity: number;
};

export interface Employee {
    _id: number;
    name: string;
    role: string;
    email: string;
    phone: string;
    password: string;
    deletedAt: Date | null;
    lastLogin: Date | null;
    isLogin: boolean;
    isAdmin: boolean;
    isActive: boolean;
    isBanned: boolean;
    createdAt: Date;
    updatedAt: Date;
    employeeId: string;
    status: 'Active' | 'On Leave' | 'Terminated';
}