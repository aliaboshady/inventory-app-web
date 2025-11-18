"use server";

import { apiClient } from "@/lib/apiClient";
import { CreateItemPayload, Item } from "@/models/item.model";

export const createItem = async (payload: CreateItemPayload): Promise<Item> => {
  return apiClient<Item>("items", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
