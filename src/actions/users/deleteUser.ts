"use server";

import { apiClient } from "@/lib/apiClient";
import { ServerResponse } from "@/models/shared.model";

export const deleteUser = async (id: string): Promise<ServerResponse<void>> => {
  return apiClient<void>(`users/${id}`, {
    method: "DELETE",
  });
};
