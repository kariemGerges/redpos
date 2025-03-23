import { NextResponse } from 'next/server';
import { getFilteredProducts } from '@/server/controllers/productController';

export async function GET(NextRequest) {
    try {
        return getFilteredProducts(NextRequest);
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message,
            stack : error.stack,
            status: 500,
        });
    }
}
