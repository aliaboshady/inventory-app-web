"use server";

import { apiClient } from "@/lib/apiClient";
import { getFilter } from "@/lib/utils";
import { Paginated, ServerResponse } from "@/models/shared.model";
import { User, UsersPayload } from "@/models/user.model";

export const getUsers = async ({
  page = 1,
  limit = 10,
  search,
  role,
  isActive,
  orderBy,
  orderType,
}: UsersPayload): Promise<ServerResponse<Paginated<User[]>>> => {
  return apiClient<ServerResponse<Paginated<User[]>>>(
    `users?page=${page}&limit=${limit}${getFilter(
      "search",
      search
    )}${getFilter("role", role)}${getFilter("isActive", isActive)}${getFilter(
      "orderBy",
      orderBy
    )}${getFilter("orderType", orderType)}`,
    {
      method: "GET",
    }
  );
};
