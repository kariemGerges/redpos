import { NextResponse } from 'next/server';
import { validateRegister } from '@/server/middlewares/validateUser';
import { registerUser } from '@/server/controllers/authController';

export async function POST(request) {
    try {
        // Get the request body
        const body = await request.json();

        // Validate request body using Joi schema
        const { valid, errors } = validateRegister(body);
        if (!valid) {
            return NextResponse.json(
                { message: 'Validation failed', errors },
                { status: 400 }
            );
        }

        return registerUser(body);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
