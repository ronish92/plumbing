"use server";

import { userResponseModel } from "@/models/auth/userResponse";
import { cookies } from "next/headers";

const ACCESS_TOKEN_MAX_AGE = 60 * 60; 
const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24; 

export async function SetCookieWeb(data: userResponseModel) {
  const cookieStore = await cookies();

const cookieOptions = {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
  };

  if (data.name) {
    cookieStore.set("name", data.name, {
      ...cookieOptions,
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });
  }

  if (data.token) {
    cookieStore.set("token", data.token, {
      ...cookieOptions,
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });
  }

  if (data.role) {
    cookieStore.set("role", data.role, {
      ...cookieOptions,
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });
  }

  if (data.refreshToken) {
    cookieStore.set("refreshToken", data.refreshToken, {
      ...cookieOptions,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });
  }

  if (data.expiresAt) {
    cookieStore.set("expiresAt", data.expiresAt, {
      ...cookieOptions,
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });
  }
}


export async function DeleteAllCookieWeb() {
  const cookieStore = await cookies();

  cookieStore.delete("name");
  cookieStore.delete("token");
  cookieStore.delete("role");
  cookieStore.delete("refreshToken");

  return { success: true };
}