"use server";

import { apiClient } from "@/lib/apiClient";
import { Category, CreateCategoryPayload } from "@/models/category.model";

export const createCategory = async (
  payload: CreateCategoryPayload
): Promise<Category> => {
  return apiClient<Category>("categories", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
