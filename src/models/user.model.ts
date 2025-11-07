import { PaginatedPayload } from "./shared.model";

export type Auth = {
  accessToken: string;
  refreshToken: string;
};

export type UserRole = "ADMIN" | "STAFF";

export type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};

export type UsersPayload = PaginatedPayload & {
  search?: string;
  role?: UserRole;
  orderBy?: "createdAt" | "username";
  orderType?: "asc" | "desc";
};