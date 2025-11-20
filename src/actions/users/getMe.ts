"use server";

import { apiClient } from "@/lib/apiClient";
import { ServerResponse } from "@/models/shared.model";
import { User } from "@/models/user.model";

export const getMe = async (): Promise<ServerResponse<User>> => {
  return apiClient<User>("users/me", {
    method: "GET",
  });
};
