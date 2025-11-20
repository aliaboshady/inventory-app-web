"use server";

import { apiClient } from "@/lib/apiClient";
import { ServerResponse } from "@/models/shared.model";
import { User, CreateUserPayload } from "@/models/user.model";

export const createUser = async (
  payload: CreateUserPayload
): Promise<ServerResponse<User>> => {
  return apiClient<User>("users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
