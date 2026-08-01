import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  res.cookies.set("auth", "", {
    path: "/",
    maxAge: 0,
  });
  res.cookies.set("access-token", "", {
    path: "/",
    maxAge: 0,
  });
  res.cookies.set("user-email", "", {
    path: "/",
    maxAge: 0,
  });
  res.cookies.set("user-id", "", {
    path: "/",
    maxAge: 0,
  });

  return res;
}