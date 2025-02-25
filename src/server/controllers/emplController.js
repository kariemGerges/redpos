// src/server/controllers/employeeController.js
import { NextResponse } from 'next/server';
import User from '@/server/models/Users';
import { validatePassword } from '../utils/passwordValidationUtils';
import { isValidEmail } from '../utils/emailValidationUtils';
import { isValidUSPhoneNumber } from '../utils/phoneValidationUtils';
import connectDb from '@/server/config/db';
import hashPassword from '../utils/hashPassword';

await connectDb();


// Get All Employees
export async function getAllEmployees() {
    try {
        const employees = await User.find({}, { password: 0 });

        return NextResponse.json(
            { success: true, data: employees },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}


// Get Filtered and Paginated Employees
export async function getFilteredEmployee(request) {
    try {
        // so we can use request.nextUrl.searchParams to parse the query string
        const { searchParams } = request.nextUrl;

        // Extract query params
        // boolean fields
        const active = searchParams.get('active');
        const banned = searchParams.get('banned');
        const admin = searchParams.get('admin');
        // string fields
        const name = searchParams.get('name');
        const role = searchParams.get('role');
        const employeeId = searchParams.get('employeeId');
        const email = searchParams.get('email');
        const phone = searchParams.get('phone');
        // date fields
        const createdAt = searchParams.get('createdAt');

        // Pagination defaults
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '12');

        // Build the filter object
        const filter = {};

        // Convert string to boolean only if not null
        if (active !== null) {
            filter.isActive = active === 'true';
        }
        if (banned !== null) {
            filter.isBanned = banned === 'true';
        }
        if (admin !== null) {
            filter.isAdmin = admin === 'true';
        }

        if (name) filter.name = name;
        if (role) filter.role = role;
        if (employeeId) filter.employeeId = employeeId;
        if (email) filter.email = email;
        if (phone) filter.phone = phone;
        if (createdAt) filter.createdAt = createdAt;

        // Pagination
        const skip = (page - 1) * limit;

        // Fetch Users
        const filteredEmployee = await User.find(filter, { password: 0 })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const totalEmployee = await User.countDocuments(filter);
        const totalPages = Math.ceil(totalEmployee / limit);

        // If no Users found
        if (filteredEmployee.length === 0) {
            return NextResponse.json(
                { success: false, message: 'No Users found' },
                { status: 404 }
            );
        }

        // Build employee data object
        const employeeData = {
            Users: filteredEmployee,
            totalEmployee,
            currentPage: page,
            totalPages,
            limit,
            pageSize: limit,
            hasPreviousPage: page > 1,
            hasNextPage: page < totalPages,
            previousPage: page - 1,
            nextPage: page + 1,
        };

        // Build and return NextResponse
        return NextResponse.json(
            { success: true, employeeData },
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

// edit employee
export async function editEmployee(request) {
    try {
        const { searchParams } = request.nextUrl;

        const id = searchParams.get('id');

        // Extract fields to update from the request body
        const updateFields = request;

        // Validate email if it's being updated
        if (updateFields.email && !isValidEmail(updateFields.email)) {
            return NextResponse.json(
                { message: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Validate password if it's being updated
        if (updateFields.password) {
            validatePassword(updateFields.password);
            updateFields.password = await hashPassword(updateFields.password);
        }

        // Validate phone number if it's being updated
        if (updateFields.phone && !isValidUSPhoneNumber(updateFields.phone)) {
            return NextResponse.json(
                { message: 'Invalid phone number format' },
                { status: 400 }
            );
        }

        const updateUser = await User.findByIdAndUpdate(
            id,
            {
                $set: updateFields,
                updatedAt: new Date(),
            },
            {
                new: true,
                runValidators: true,
            }
        );

        // If no user found
        if (!updateUser) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                data: updateUser,
                message: 'User updated successfully',
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
                stack:
                    process.env.NODE_ENV === 'development' ? error.stack : null,
            },
            { status: 500 }
        );
    }
}

// delete employee
export async function deleteEmployee(request) {
    try {
        const { searchParams } = request.nextUrl;

        const id = searchParams.get('id');

        const deletedUser = await User.findByIdAndDelete(id);

        // If no user found
        if (!deletedUser) {
            return NextResponse.json(
                { success: false, error: 'Employee not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Employee deleted' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
