"use server";

import { apiClient } from "@/lib/apiClient";

export const deleteUser = async (id: string): Promise<void> => {
  return apiClient<void>(`users/${id}`, {
    method: "DELETE",
  });
};
