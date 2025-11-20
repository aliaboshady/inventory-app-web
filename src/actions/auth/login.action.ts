"use server";

import { apiClient } from "@/lib/apiClient";
import { saveTokens } from "@/lib/tokenUtils";
import { ServerResponse } from "@/models/shared.model";
import { Auth } from "@/models/user.model";

export type LoginPayload = {
  email: string;
  password: string;
};

export const login = async ({
  email,
  password,
}: LoginPayload): Promise<ServerResponse<Auth>> => {
  const res = await apiClient<Auth>("auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    skipAuth: true,
  });

  if (!res.error && res.data?.accessToken) {
    await saveTokens(res.data.accessToken);
  }

  return res;
};
