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

  return NextResponse.json({
    user: {
      email: "admin@test.com",
    },
  });
}