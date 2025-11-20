"use server";

import { apiClient } from "@/lib/apiClient";
import { ServerResponse, UploadFilePayload } from "@/models/shared.model";

export const uploadFile = async (
  payload: UploadFilePayload
): Promise<ServerResponse<void>> => {
  const { file, type, id } = payload;

  const formData = new FormData();
  formData.append("file", file);

  return apiClient<void>(`upload/${type}/${id}`, {
    method: "POST",
    body: formData,
  });
};
