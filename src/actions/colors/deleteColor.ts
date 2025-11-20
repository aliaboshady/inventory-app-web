"use server";

import { apiClient } from "@/lib/apiClient";
import { ServerResponse } from "@/models/shared.model";

export const deleteColor = async (
  id: string
): Promise<ServerResponse<void>> => {
  return apiClient<void>(`colors/${id}`, {
    method: "DELETE",
  });
};
