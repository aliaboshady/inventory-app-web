"use server";

import { apiClient } from "@/lib/apiClient";
import { CreateItemPayload, Item } from "@/models/item.model";
import { ServerResponse } from "@/models/shared.model";

export const createItem = async (
  payload: CreateItemPayload
): Promise<ServerResponse<Item>> => {
  return apiClient<Item>("items", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
