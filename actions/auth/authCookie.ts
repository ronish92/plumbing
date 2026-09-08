"use server";

import { cookies } from "next/headers";

const ACCESS_TOKEN_MAX_AGE = 60 * 60; 
const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24; 

export async function SetCookieWeb(data: any) {
  const cookieStore = await cookies();

  if (data.name) {
    cookieStore.set("name", data.name, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: ACCESS_TOKEN_MAX_AGE,
      path: "/",
    });
  }

  if (data.token) {
    cookieStore.set("token", data.token, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: ACCESS_TOKEN_MAX_AGE,
      path: "/",
    });
  }

  if (data.roles) {
    cookieStore.set("roles", JSON.stringify(data.roles), {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: ACCESS_TOKEN_MAX_AGE,
      path: "/",
    });
  }

  if (data.refreshToken) {
    cookieStore.set("refreshToken", data.refreshToken, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: REFRESH_TOKEN_MAX_AGE,
      path: "/",
    });
  }
}

export async function DeleteAllCookieWeb() {
  const cookieStore = await cookies();

  cookieStore.delete("name");
  cookieStore.delete("token");
  cookieStore.delete("roles");
  cookieStore.delete("refreshToken");

  return { success: true };
}