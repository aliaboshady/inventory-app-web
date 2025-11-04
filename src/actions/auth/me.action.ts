"use server";

import { apiClient } from "@/lib/apiClient";
import { ServerResponse } from "@/models/shared.model";
import { User } from "@/models/user.model";

export const me = async (): Promise<ServerResponse<User>> => {
  return apiClient<ServerResponse<User>>("users/me", {
    method: "GET",
  });
};
