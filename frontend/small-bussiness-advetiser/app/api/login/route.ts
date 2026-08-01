import { NextResponse } from "next/server";

const backendBaseUrl = process.env.BACKEND_URL ?? "http://webapi:80";
const isProd = process.env.NODE_ENV === "production";

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

  const responseBody = await backendResponse.json().catch(() => null);
  const response = NextResponse.json(responseBody ?? { success: false, message: "Login failed" }, {
    status: backendResponse.status,
  });

  if (backendResponse.ok && responseBody?.success && responseBody?.data?.token) {
    const { token, userId, email: userEmail } = responseBody.data;

    response.cookies.set("auth", "logged-in", {
      path: "/",
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
    response.cookies.set("access-token", token, {
      path: "/",
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
    response.cookies.set("user-email", userEmail ?? "", {
      path: "/",
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
    response.cookies.set("user-id", String(userId ?? ""), {
      path: "/",
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
  } else {
    response.cookies.set("auth", "", { path: "/", maxAge: 0 });
    response.cookies.set("access-token", "", { path: "/", maxAge: 0 });
    response.cookies.set("user-email", "", { path: "/", maxAge: 0 });
    response.cookies.set("user-id", "", { path: "/", maxAge: 0 });
  }

  return response;
}