"use server";

import { apiClient } from "@/lib/apiClient";
import { Color, CreateColorPayload } from "@/models/color.model";
import { ServerResponse } from "@/models/shared.model";

export const createColor = async (
  payload: CreateColorPayload
): Promise<ServerResponse<Color>> => {
  return apiClient<Color>("colors", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
