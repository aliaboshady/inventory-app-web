"use server";

import { apiClient } from "@/lib/apiClient";
import { CreateItemPayload, Item } from "@/models/item.model";
import { Paginated } from "@/models/shared.model";

export const createItem = async (
  payload: CreateItemPayload
): Promise<Paginated<Item>> => {
  return apiClient<Paginated<Item>>("items", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
