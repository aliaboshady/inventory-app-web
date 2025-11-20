"use server";

import { apiClient } from "@/lib/apiClient";
import { Color, EditColorPayload } from "@/models/color.model";
import { ServerResponse } from "@/models/shared.model";

export const editColor = async (
  payload: EditColorPayload
): Promise<ServerResponse<Color>> => {
  const { _id, ...newPayload } = payload;

  return apiClient<Color>(`colors/${payload._id}`, {
    method: "PATCH",
    body: JSON.stringify(newPayload),
  });
};
