import { NextResponse } from "next/server";
import { validateLogin } from "@/server/middlewares/validateUser";
import { adminUserLogin } from '@/server/controllers/authController';

export async function POST(request) {
    try {
        // Get the request body
        const body = await request.json();

        // Validate request body using Joi schema
        const { valid, errors } = validateLogin(body);
        if (!valid) {
            return NextResponse.json(
                { message: "Validation failed", errors },
                { status: 400 }
            );
        }

        return adminUserLogin(body);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}