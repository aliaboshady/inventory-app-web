"use server";

import { ROUTES } from "./staticKeys";
import { getAccessToken, isTokenExpired, clearTokens } from "./tokenUtils";
import { redirect } from "next/navigation";

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
  redirectToLogin?: boolean;
}

export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { skipAuth = false, redirectToLogin = true, ...fetchOptions } = options;

  // Clone headers to avoid readonly issues
  const headers = new Headers(fetchOptions.headers);

  // If authentication is required, handle access token
  if (!skipAuth) {
    const accessToken = await getAccessToken();

    // If we have a valid token, add it to the headers
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    } else {
      // No token available, redirect to login
      if (redirectToLogin) redirect(ROUTES.login?.url);
    }
  }

  // Set content type if not already set and it's not a GET request
  if (
    !headers.has("Content-Type") &&
    fetchOptions.method &&
    fetchOptions.method !== "GET" &&
    !(fetchOptions.body instanceof FormData)
  ) {
    headers.set("Content-Type", "application/json");
  }

  // Create the final options object with the processed headers
  const finalOptions = {
    ...fetchOptions,
    headers,
  };

  // Make the API request
  try {
    console.log(
      "🔵 ⬅️ ~ Intercepting request to httpClient:",
      endpoint,
      finalOptions
    );
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${endpoint}`,
      finalOptions
    );

    if (response.status === 401 && !skipAuth) {
      await clearTokens();
      if (redirectToLogin) redirect(ROUTES.login?.url);
    }

    const json = await response.json();
    console.log("🟢 ➡️ ~ Response of:", endpoint, json);

    if (!json) {
      return {} as T;
    }

    return json as T;
  } catch (error) {
    console.log("🔴 ➡️ ~ Response of ERROR:", endpoint, error);
    throw error;
  }
}
