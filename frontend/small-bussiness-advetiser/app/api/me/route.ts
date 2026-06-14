import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const auth = (await cookies()).get("auth");

  if (!auth || auth.value !== "logged-in") {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user: "test user" });
}