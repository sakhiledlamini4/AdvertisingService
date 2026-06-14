import { cookies } from "next/headers";

export async function getUser() {
  const cookieStore = cookies();
  const auth = (await cookieStore).get("auth");

  return auth?.value === "logged-in";
}