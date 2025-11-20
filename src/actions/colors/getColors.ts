"use server";

import { apiClient } from "@/lib/apiClient";
import { getFilter } from "@/lib/utils";
import { ColorsPayload, Color } from "@/models/color.model";
import { ServerResponse } from "@/models/shared.model";

export const getColors = async ({
  search,
}: ColorsPayload): Promise<ServerResponse<Color[]>> => {
  return apiClient<Color[]>(`colors?${getFilter("search", search)}`, {
    method: "GET",
  });
};
