"use server";

import { apiClient } from "@/lib/apiClient";
import { Color, EditColorPayload } from "@/models/color.model";

export const editColor = async (payload: EditColorPayload): Promise<Color> => {
  const { _id, ...newPayload } = payload;

  return apiClient<Color>(`colors/${payload._id}`, {
    method: "PATCH",
    body: JSON.stringify(newPayload),
  });
};
