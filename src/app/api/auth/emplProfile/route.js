import { NextResponse } from 'next/server';
import { getUserProfile } from '@/server/controllers/authController';

export async function GET() {
    try {
        return getUserProfile();
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}