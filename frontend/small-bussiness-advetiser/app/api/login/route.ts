import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  // 🔐 Replace this with DB check later
  if (email === "admin@test.com" && password === "password1234") {
    const response = NextResponse.json({ success: true });

    // set a simple cookie (session token placeholder)
    response.cookies.set("auth", "logged-in", {
      httpOnly: true,
      path: "/",
    });

    return response;
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}