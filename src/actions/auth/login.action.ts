"use server";

import { apiClient } from "@/lib/apiClient";
import { saveTokens } from "@/lib/tokenUtils";
import { ServerResponse } from "@/models/shared.model";
import { Auth } from "@/models/user.model";

export type LoginPayload = {
  username: string;
  password: string;
};

export const login = async ({
  username,
  password,
}: LoginPayload): Promise<ServerResponse<Auth>> => {
  const res = await apiClient<ServerResponse<Auth>>("auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    skipAuth: true,
  });

  if (res?.data) {
    const { refreshToken, accessToken } = res?.data;
    if (refreshToken && accessToken) {
      await Promise.all([saveTokens(accessToken, refreshToken)]);
    }
  }

  return res;
};
