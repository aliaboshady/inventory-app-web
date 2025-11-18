"use server";

import { apiClient } from "@/lib/apiClient";
import { Color, CreateColorPayload } from "@/models/color.model";

export const createColor = async (
  payload: CreateColorPayload
): Promise<Color> => {
  return apiClient<Color>("colors", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
