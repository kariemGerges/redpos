// File: types.ts
export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    imageUrl: string;
}

export interface CartItemType {
    product: Product;
    quantity: number;
}
