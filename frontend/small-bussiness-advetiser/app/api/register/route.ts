import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { firstName, lastName, email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { message: "Missing fields" },
      { status: 400 }
    );
  }

  // ⚠️ Fake "registration"
  console.log("New user:", {
    firstName,
    lastName,
    email,
    password,
  });

  return NextResponse.json({
    message: "User created successfully",
  });
}