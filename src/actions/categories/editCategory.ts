"use server";

import { apiClient } from "@/lib/apiClient";
import { Category, EditCategoryPayload } from "@/models/category.model";
import { ServerResponse } from "@/models/shared.model";

export const editCategory = async (
  payload: EditCategoryPayload
): Promise<ServerResponse<Category>> => {
  const { _id, ...newPayload } = payload;

  return apiClient<Category>(`categories/${_id}`, {
    method: "PATCH",
    body: JSON.stringify(newPayload),
  });
};
