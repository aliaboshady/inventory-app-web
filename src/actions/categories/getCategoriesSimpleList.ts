"use server";

import { apiClient } from "@/lib/apiClient";
import { Category } from "@/models/category.model";
import { ServerResponse } from "@/models/shared.model";

export const getCategoriesSimpleList = async (): Promise<
  ServerResponse<Category[]>
> => {
  return apiClient<Category[]>("categories/simple-list", {
    method: "GET",
  });
};
