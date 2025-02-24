import { logoutUser } from "@/server/controllers/authController";

export async function POST() {
    try {
        const response = await logoutUser();
        return response;
    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}