"use server";

import { apiClient } from "@/lib/apiClient";
import { Paginated } from "@/models/shared.model";
import { User, ChangeUserPasswordPayload } from "@/models/user.model";

export const changeUserPassword = async (
  payload: ChangeUserPasswordPayload
): Promise<Paginated<User>> => {
  const { _id, password } = payload;

  return apiClient<Paginated<User>>(`users/${_id}/change-password`, {
    method: "POST",
    body: JSON.stringify({ password }),
  });
};
