"use server";

import { apiClient } from "@/lib/apiClient";
import { Paginated } from "@/models/shared.model";
import { User, CreateUserPayload } from "@/models/user.model";

export const createUser = async (
  payload: CreateUserPayload
): Promise<Paginated<User>> => {
  return apiClient<Paginated<User>>("users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
