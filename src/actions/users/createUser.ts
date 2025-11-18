"use server";

import { apiClient } from "@/lib/apiClient";
import { User, CreateUserPayload } from "@/models/user.model";

export const createUser = async (payload: CreateUserPayload): Promise<User> => {
  return apiClient<User>("users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
