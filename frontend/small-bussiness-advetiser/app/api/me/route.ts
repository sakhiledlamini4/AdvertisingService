import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const loggedIn = await isAuthenticated();

  if (!loggedIn) {
    return NextResponse.json(
      { user: null },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();
  const userEmail = cookieStore.get("user-email")?.value;
  const userId = cookieStore.get("user-id")?.value;

  return NextResponse.json({
    user: {
      id: userId ? Number(userId) : null,
      email: userEmail ?? null,
    },
  });
}