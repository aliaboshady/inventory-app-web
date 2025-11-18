"use server";

import { apiClient } from "@/lib/apiClient";
import { User, EditUserPayload } from "@/models/user.model";

export const editUser = async (payload: EditUserPayload): Promise<User> => {
  const { _id, ...newPayload } = payload;

  return apiClient<User>(`users/${payload._id}`, {
    method: "PATCH",
    body: JSON.stringify(newPayload),
  });
};
