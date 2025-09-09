"use server";

import { cookies } from "next/headers";

export async function setCookie(
  key: string,
  value: string,
  options?: {
    path?: string;
    maxAge?: number;
    httpOnly?: boolean;
    sameSite?: "strict" | "lax" | "none";
    secure?: boolean;
  }
) {
  (await cookies()).set(key, value, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    ...options,
  });
}
