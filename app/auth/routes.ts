import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";


const baseUrl = process.env.API_BASE_URL;

export async function POST() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!token || !refreshToken) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const res = await axios.post(`${baseUrl}/refresh-token`, {
    accessToken: token,
    refreshToken,
  });

  if (!res.data?.status) {
    cookieStore.getAll().forEach(c => cookieStore.delete(c.name));
    return NextResponse.json({ success: false }, { status: 401 });
  }

  cookieStore.set("token", res.data.data.token, { httpOnly: true });
  cookieStore.set("refreshToken", res.data.data.refreshToken, { httpOnly: true });

  return NextResponse.json({ success: true });
}
