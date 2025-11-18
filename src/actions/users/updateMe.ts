"use server";

import { apiClient } from "@/lib/apiClient";
import { User, EditUserPayload } from "@/models/user.model";

export const updateMe = async (payload: EditUserPayload): Promise<User> => {
  const { _id: _, ...newPayload } = payload;

  return apiClient<User>("users/me", {
    method: "PATCH",
    body: JSON.stringify(newPayload),
  });
};
