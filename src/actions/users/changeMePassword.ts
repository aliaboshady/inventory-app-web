"use server";

import { apiClient } from "@/lib/apiClient";
import { Paginated } from "@/models/shared.model";
import { User } from "@/models/user.model";

export const changeMePassword = async (
  password: string
): Promise<Paginated<User>> => {
  return apiClient<Paginated<User>>(`users/me/change-password`, {
    method: "POST",
    body: JSON.stringify({ password }),
  });
};
