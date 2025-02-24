import { NextResponse } from 'next/server';
import { getFilteredEmployee } from '@/server/controllers/emplController';
export async function GET(NextRequest) {
    try {
        
        return getFilteredEmployee(NextRequest);
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
