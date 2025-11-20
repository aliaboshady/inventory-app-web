"use server";

import { apiClient } from "@/lib/apiClient";
import { getFilter } from "@/lib/utils";
import { CategoriesPayload, Category } from "@/models/category.model";
import { Paginated } from "@/models/shared.model";
import { ServerResponse } from "@/models/shared.model";

export const getCategories = async ({
  page = 1,
  itemsPerPage = 10,
  name,
}: CategoriesPayload): Promise<ServerResponse<Paginated<Category>>> => {
  return apiClient<Paginated<Category>>(
    `categories?page=${page}&itemsPerPage=${itemsPerPage}${getFilter(
      "name",
      name
    )}`,
    {
      method: "GET",
    }
  );
};
