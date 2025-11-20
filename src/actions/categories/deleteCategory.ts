"use server";

import { apiClient } from "@/lib/apiClient";
import { ServerResponse } from "@/models/shared.model";

export const deleteCategory = async (
  id: string
): Promise<ServerResponse<void>> => {
  return apiClient<void>(`categories/${id}`, {
    method: "DELETE",
  });
};
