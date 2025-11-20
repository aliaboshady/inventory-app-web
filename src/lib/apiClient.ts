"use server";

import { ServerResponse } from "@/models/shared.model";
import { ROUTES } from "./staticKeys";
import { getAccessToken, clearTokens } from "./tokenUtils";
import { redirect } from "next/navigation";

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
  redirectToLogin?: boolean;
}

export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ServerResponse<T>> {
  const { skipAuth = false, redirectToLogin = true, ...fetchOptions } = options;

  const headers = new Headers(fetchOptions.headers);

  // --- Add Authorization if needed ---
  if (!skipAuth) {
    const token = await getAccessToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else if (redirectToLogin) {
      redirect(ROUTES.login.url);
    }
  }

  // --- Set JSON Content-Type when needed ---
  if (
    !headers.has("Content-Type") &&
    fetchOptions.method &&
    fetchOptions.method !== "GET" &&
    !(fetchOptions.body instanceof FormData)
  ) {
    headers.set("Content-Type", "application/json");
  }

  try {
    console.log("🔵 ⬅️ Request to:", endpoint, fetchOptions);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${endpoint}`,
      {
        ...fetchOptions,
        headers,
      }
    );

    const json = await response.json().catch(() => {});
    console.log("🟢 ➡️ Response from:", endpoint, json);

    // Auto-logout on 401
    if (response.status === 401 && !skipAuth) {
      console.log("🔴 401 Unauthorized — clearing tokens and redirecting");
      await clearTokens();
      if (redirectToLogin) redirect(ROUTES.login.url);
    }

    // ❌ ERROR RESPONSE
    if (!response.ok) {
      console.log("🔴 ➡️ API error:", json?.message || "SERVER_ERROR");
      return {
        error: true,
        message: json?.message || "SERVER_ERROR",
      };
    }

    // ✅ SUCCESS RESPONSE
    return {
      error: false,
      data: json as T,
      message: json?.message, // backend success message if exists
    };
  } catch (err: any) {
    console.log("🔴 ➡️ Network / fetch error:", err);
    return {
      error: true,
      message: err?.message || "NETWORK_ERROR",
    };
  }
}
