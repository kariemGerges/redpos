//  fetch products by filers and pagination

import { NextResponse } from 'next/server';
import Product from '../models/Product';
import connectDb from '../config/dbProduct';

await connectDb();

export async function getFilteredProducts(request) {
    try {
        const { searchParams } = request.nextUrl;

        // string fields
        const category = searchParams.get('category');
        const brand = searchParams.get('brand');
        const name = searchParams.get('name');

        // Pagination defaults
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '12');

        // build the filter object
        const filter = {};
        if (category) {
            const categories = Array.isArray(category) ? category : [category];
            filter.category = { $in: categories };
        }
        if (brand) {
            const brands = Array.isArray(brand) ? brand : [brand];
            filter.brand = { $in: brands };
        }
        if (name) {
           // const names = Array.isArray(name) ? name : [name];
            filter.name = { $regex: name, $options: 'i' };
        }

        // pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // fetch products
        const filteredProducts = await Product.find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        const totalProducts = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / parseInt(limit));

        // If no Users found
        if (filteredProducts.length === 0) {
            return NextResponse.json(
                { success: false, message: 'No Users found' },
                { status: 404 }
            );
        }

        const productsData = {
            products: filteredProducts,
            totalProducts,
            currentPage: parseInt(page),
            totalPages: totalPages,
            limit: parseInt(limit),
            pageSize: parseInt(limit),
            hasPreviousPage: parseInt(page) > 1,
            hasNextPage: parseInt(page) < totalPages,
            previousPage: parseInt(page) - 1,
            nextPage: parseInt(page) + 1,
        };

        // Build and return NextResponse
        return NextResponse.json(
            { success: true, productsData },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error.message,
                stack:
                    process.env.NODE_ENV === 'development' ? error.stack : null,
            },
            { status: 500 }
        );
    }
}
