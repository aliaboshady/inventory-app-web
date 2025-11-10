"use server";

import { apiClient } from "@/lib/apiClient";

export const deleteItem = async (id: string): Promise<void> => {
  return apiClient<void>(`items/${id}`, {
    method: "DELETE",
  });
};
