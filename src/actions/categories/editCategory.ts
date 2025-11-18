"use server";

import { apiClient } from "@/lib/apiClient";
import { Category, EditCategoryPayload } from "@/models/category.model";

export const editCategory = async (
  payload: EditCategoryPayload
): Promise<Category> => {
  const { _id, ...newPayload } = payload;

  return apiClient<Category>(`categories/${payload._id}`, {
    method: "PATCH",
    body: JSON.stringify(newPayload),
  });
};
