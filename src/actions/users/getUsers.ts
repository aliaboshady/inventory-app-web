"use server";

import { apiClient } from "@/lib/apiClient";
import { getFilter } from "@/lib/utils";
import { Paginated } from "@/models/shared.model";
import { User, UsersPayload } from "@/models/user.model";

export const getUsers = async ({
  page = 1,
  itemsPerPage = 10,
  search,
  role,
}: UsersPayload): Promise<Paginated<User>> => {
  return apiClient<Paginated<User>>(
    `users?page=${page}&itemsPerPage=${itemsPerPage}${getFilter(
      "search",
      search
    )}${getFilter("role", role)}`,
    {
      method: "GET",
    }
  );
};
