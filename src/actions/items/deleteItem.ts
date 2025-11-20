"use server";

import { apiClient } from "@/lib/apiClient";
import { ServerResponse } from "@/models/shared.model";

export const deleteItem = async (id: string): Promise<ServerResponse<void>> => {
  return apiClient<void>(`items/${id}`, {
    method: "DELETE",
  });
};
