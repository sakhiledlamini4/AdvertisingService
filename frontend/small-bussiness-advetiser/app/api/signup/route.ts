import { NextResponse } from "next/server";

const backendBaseUrl = process.env.BACKEND_URL ?? "http://webapi:80";

export async function POST(req: Request) {
  const body = await req.json();
  const { firstName, lastName, email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { message: "Missing fields" },
      { status: 400 }
    );
  }

  const backendResponse = await fetch(`${backendBaseUrl}/api/account/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName, email, password }),
    cache: "no-store",
  });

  const responseBody = await backendResponse.json();
  return NextResponse.json(responseBody, { status: backendResponse.status });
}