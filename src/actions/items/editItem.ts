"use server";

import { apiClient } from "@/lib/apiClient";
import { Item, EditItemPayload } from "@/models/item.model";
import { Paginated } from "@/models/shared.model";

export const editItem = async (
  payload: EditItemPayload
): Promise<Paginated<Item>> => {
  const { _id, ...newPayload } = payload;

  return apiClient<Paginated<Item>>(`items/${payload._id}`, {
    method: "PATCH",
    body: JSON.stringify(newPayload),
  });
};
