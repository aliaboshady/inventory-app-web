"use server";

import { apiClient } from "@/lib/apiClient";
import { ServerResponse } from "@/models/shared.model";
import { User, EditUserPayload } from "@/models/user.model";

export const editUser = async (
  payload: EditUserPayload
): Promise<ServerResponse<User>> => {
  const { _id, ...newPayload } = payload;

  return apiClient<User>(`users/${_id}`, {
    method: "PATCH",
    body: JSON.stringify(newPayload),
  });
};
