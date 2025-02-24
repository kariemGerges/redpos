import { NextResponse } from 'next/server';
import { editEmployee } from '@/server/controllers/emplController';

export async function PATCH(request) {
    try {
        const body = await request.json();

        return editEmployee({ ...body, nextUrl: request.nextUrl });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
