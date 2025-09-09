"use server";

import { cookies } from "next/headers";

export async function getCookie(key: string) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(key)?.value || null;
  return cookie;
}
