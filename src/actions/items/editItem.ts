"use server";

import { apiClient } from "@/lib/apiClient";
import { Item, EditItemPayload } from "@/models/item.model";
import { ServerResponse } from "@/models/shared.model";

export const editItem = async (
  payload: EditItemPayload
): Promise<ServerResponse<Item>> => {
  const { _id, ...newPayload } = payload;

  return apiClient<Item>(`items/${payload._id}`, {
    method: "PATCH",
    body: JSON.stringify(newPayload),
  });
};
