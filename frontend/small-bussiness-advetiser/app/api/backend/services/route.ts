import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const backendBaseUrl = process.env.BACKEND_URL ?? "http://webapi:80";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access-token")?.value;

    const headers: Record<string,string> = {
      "Content-Type": "application/json",
    };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    const backendRes = await fetch(`${backendBaseUrl}/api/services`, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    const body = await backendRes.json().catch(()=>null);

    if (!backendRes.ok || !body) {
      // return a small fallback list
      const fallback = [
        { id: 1, name: 'Spotless Cleaning', category: 'Home Cleaning', location: 'New York, NY', imageUrl: '/thumb.svg' },
        { id: 2, name: 'A1 Plumbing Pros', category: 'Plumbing', location: 'Los Angeles, CA', imageUrl: '/thumb.svg' },
        { id: 3, name: 'Bright Electric', category: 'Electrical', location: 'Chicago, IL', imageUrl: '/thumb.svg' },
        { id: 4, name: 'Digital Boost Agency', category: 'Marketing', location: 'Austin, TX', imageUrl: '/thumb.svg' },
        { id: 5, name: 'Elegant Touch Salon', category: 'Beauty', location: 'Miami, FL', imageUrl: '/thumb.svg' }
      ];

      return NextResponse.json({ success: false, data: fallback }, { status: 200 });
    }

    // backend returns ApiResponse<T> shape — normalize
    const data = body?.data ?? body;
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    const fallback = [
      { id: 1, name: 'Spotless Cleaning', category: 'Home Cleaning', location: 'New York, NY', imageUrl: '/thumb.svg' },
      { id: 2, name: 'A1 Plumbing Pros', category: 'Plumbing', location: 'Los Angeles, CA', imageUrl: '/thumb.svg' },
      { id: 3, name: 'Bright Electric', category: 'Electrical', location: 'Chicago, IL', imageUrl: '/thumb.svg' }
    ];
    return NextResponse.json({ success: false, data: fallback }, { status: 200 });
  }
}
