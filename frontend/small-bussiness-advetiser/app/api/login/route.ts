import { NextResponse } from "next/server";

const backendBaseUrl = process.env.BACKEND_URL ?? "http://webapi:80";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  const backendResponse = await fetch(`${backendBaseUrl}/api/account/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  const responseBody = await backendResponse.json();
  return NextResponse.json(responseBody, { status: backendResponse.status });
}