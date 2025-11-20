"use server";

import { apiClient } from "@/lib/apiClient";
import { Category, CreateCategoryPayload } from "@/models/category.model";
import { ServerResponse } from "@/models/shared.model";

export const createCategory = async (
  payload: CreateCategoryPayload
): Promise<ServerResponse<Category>> => {
  return apiClient<Category>("categories", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
