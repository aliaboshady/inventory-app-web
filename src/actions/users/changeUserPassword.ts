"use server";

import { apiClient } from "@/lib/apiClient";
import { User, ChangeUserPasswordPayload } from "@/models/user.model";

export const changeUserPassword = async (
  payload: ChangeUserPasswordPayload
): Promise<User> => {
  const { _id, password } = payload;

  return apiClient<User>(`users/${_id}/change-password`, {
    method: "POST",
    body: JSON.stringify({ password }),
  });
};
