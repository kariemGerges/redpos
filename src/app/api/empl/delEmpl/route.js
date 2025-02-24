import { NextResponse } from 'next/server';
import { deleteEmployee } from '@/server/controllers/emplController';
export async function DELETE(NextRequest) {
    try {
        return deleteEmployee(NextRequest);
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
