"use server";

import { ROUTES } from "./staticKeys";
import {
  getAccessToken,
  isTokenExpired,
  refreshAccessToken,
  clearTokens,
} from "./tokenUtils";
import { redirect } from "next/navigation";

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
  refreshTokens?: boolean;
  redirectToLogin?: boolean;
}

export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    skipAuth = false,
    refreshTokens = true,
    redirectToLogin = true,
    ...fetchOptions
  } = options;

  // Clone headers to avoid readonly issues
  const headers = new Headers(fetchOptions.headers);

  // If authentication is required, handle access token
  if (!skipAuth) {
    let accessToken = await getAccessToken();

    // Check if token exists and if it's expired
    if (accessToken && isTokenExpired(accessToken) && refreshTokens) {
      // Try to refresh the token
      const refreshed = await refreshAccessToken();

      if (!refreshed) {
        // If refresh failed, clear tokens and redirect to login
        await clearTokens();
        if (redirectToLogin) redirect(ROUTES.login?.url);
      }

      // Get the new token after refresh
      accessToken = await getAccessToken();
    }

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

    // If unauthorized and we didn't skip auth, attempt to refresh and retry
    if (response.status === 401 && !skipAuth && refreshTokens) {
      const refreshed = await refreshAccessToken();

      if (refreshed) {
        // If refresh succeeded, get the new token and retry the request
        const newAccessToken = await getAccessToken();
        if (newAccessToken) {
          headers.set("Authorization", `Bearer ${newAccessToken}`);

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`,
            {
              ...finalOptions,
              headers,
            }
          );

          const json = await response.json();

          if (!json) {
            return {} as T;
          }

          return json;
        }
      }

      // If refresh failed or no new token, clear tokens and redirect
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
