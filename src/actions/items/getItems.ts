"use server";

import { apiClient } from "@/lib/apiClient";
import { getFilter } from "@/lib/utils";
import { Item, ItemsPayload } from "@/models/item.model";
import { Paginated } from "@/models/shared.model";

export const getItems = async ({
  page = 1,
  itemsPerPage = 10,
  _id,
  name,
  category,
  status,
}: ItemsPayload): Promise<Paginated<Item>> => {
  return apiClient<Paginated<Item>>(
    `items?page=${page}&itemsPerPage=${itemsPerPage}${getFilter(
      "id",
      _id
    )}${getFilter("name", name)}${getFilter("category", category)}${getFilter(
      "status",
      status
    )}`,
    {
      method: "GET",
    }
  );
};
