"use server";

import { apiClient } from "@/lib/apiClient";
import { ServerResponse } from "@/models/shared.model";
import { User, EditUserPayload } from "@/models/user.model";

export const updateMe = async (
  payload: EditUserPayload
): Promise<ServerResponse<User>> => {
  const { _id: _, ...newPayload } = payload;

  return apiClient<User>("users/me", {
    method: "PATCH",
    body: JSON.stringify(newPayload),
  });
};
