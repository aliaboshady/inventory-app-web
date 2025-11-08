"use server";

import { apiClient } from "@/lib/apiClient";
import { Paginated } from "@/models/shared.model";
import { User, EditUserPayload } from "@/models/user.model";

export const updateMe = async (
  payload: EditUserPayload
): Promise<Paginated<User>> => {
  const { _id, ...newPayload } = payload;

  return apiClient<Paginated<User>>("users/me", {
    method: "PATCH",
    body: JSON.stringify(newPayload),
  });
};
