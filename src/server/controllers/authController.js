import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import jwt from 'jsonwebtoken';
import User from '../models/Users';
import { validatePassword } from '../utils/passwordValidationUtils';
import { isValidEmail } from '../utils/emailValidationUtils';
import { isValidUSPhoneNumber } from '../utils/phoneValidationUtils';

import connectDb from '../config/db';

// Connect to database
await connectDb();
// Generate JWT token
function generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '60m' });
}

// 1) Add a new user
export async function registerUser(request) {
    try {
        const { name, email, phone, password } = request;

        // Check if user already exists
        const userExists = await User.findOne({ email: { $eq: email } });

        // Check if user already exists
        if (userExists) {
            throw new Error('User already exists');
        }

        // Validate email
        if (!isValidEmail(email)) {
            throw new Error('Invalid email format');
        }

        // Validate password
        validatePassword(password);

        // Validate phone number
        if (!isValidUSPhoneNumber(phone)) {
            throw new Error('Invalid phone number format');
        }

        // Create new user
        const user = await User.create({ name, email, phone, password });

        // Generate JWT token
        const token = generateToken(user._id.toString());

        // Return user data
        const userData = {
            _id: user._id,
            employeeId: user.employeeId,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            role: user.role,
            isActive: user.isActive,
            isBanned: user.isBanned,
        };

        // Build the NextResponse
        const response = NextResponse.json(
            { success: true, userData },
            { status: 201 }
        );
        response.cookies.set('authToken', token, {
            httpOnly: true,
            maxAge: 60 * 60,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
        });

        return response;
    } catch (err) {
        return NextResponse.json(
            {
                message: err.message,
                stack:
                    process.env.NODE_ENV === 'development' ? err.stack : null,
            },
            { status: 501 }
        );
    }
}

// 2) Admin user login
export async function adminUserLogin(request) {
    try {
        const { email, password } = request;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: 'Invalid email or password or both.' },
                { status: 401 }
            );
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return NextResponse.json(
                { message: 'Invalid email or password or both' },
                { status: 401 }
            );
        }

        if (!user.isAdmin) {
            return NextResponse.json(
                {
                    message:
                        'Access denied; you are not allowed to access this admin resource.',
                },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = generateToken(user._id.toString());

        // Build the NextResponse
        const adminUserData = {
            success: true,
            message: `Welcome back ${user.name}!!!`,
            _id: user._id,
            employeeId: user.employeeId,
            name: user.name,
            email: user.email,
            role: user.role,
            isAdmin: user.isAdmin,
        };

        const response = NextResponse.json(
            { success: true, adminUserData },
            { status: 201 }
        );
        response.cookies.set('authToken', token, {
            httpOnly: true,
            maxAge: 60 * 60,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
        });

        return response;
    } catch (err) {
        return NextResponse.json(
            {
                message: err.message,
                stack:
                    process.env.NODE_ENV === 'development' ? err.stack : null,
            },
            { status: 500 }
        );
    }
}

// 3) user login
export async function loginUser(request) {
    try {
        const { email, password } = request;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: 'Invalid email or password or both' },
                { status: 401 }
            );
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return NextResponse.json(
                { message: 'Invalid email or password or both' },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = generateToken(user._id.toString());

        // Build the NextResponse
        const userData = {
            _id: user._id,
            employeeId: user.employeeId,
            name: user.name,
            email: user.email,
            role: user.role,
            isAdmin: user.isAdmin,
            isActive: user.isActive,
            isBanned: user.isBanned,
        };
        const response = NextResponse.json(
            { success: true, userData },
            { status: 201 }
        );
        response.cookies.set('authToken', token, {
            httpOnly: true,
            maxAge: 60 * 60,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
        });

        return response;
    } catch (err) {
        return NextResponse.json(
            {
                message: err.message,
                stack:
                    process.env.NODE_ENV === 'development' ? err.stack : null,
            },
            { status: 500 }
        );
    }
}

// 4) user logout
export async function logoutUser() {
    try {
        const response = NextResponse.json(
            { message: 'User logged out successfully' },
            { status: 200 }
        );

        // Delete cookie on that NextResponse
        response.cookies.delete('authToken');

        return response;
    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

// 5) Get logged-in user profile
/**
 * 
 * this function gets the user profile it gets the user profile of the user who logged in
 */
export async function getUserProfile() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('authToken')?.value;

        if (!token) {
            return NextResponse.json(
                { message: 'Not authenticated; no token provided' },
                { status: 401 }
            );
        }

        // Verify token & get user ID
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return NextResponse.json(
                { message: 'Invalid or expired token', error },
                { status: 401 }
            );
        }

        // Find user by decoded token ID
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        };

        if (!user.isActive || user.isBanned) {
            return NextResponse.json(
                { message: 'Access denied... Please contact admin' },
                { status: 401 }
            );
        };

        return NextResponse.json(
            {
                success: true,
                data: user,
            },
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
