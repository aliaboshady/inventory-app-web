import { PaginatedPayload } from "./shared.model";

export type Auth = {
  accessToken: string;
  refreshToken: string;
};

export type UserRole = "ADMIN" | "SUPER_ADMIN";
export type UserStatus = "ACTIVE" | "INACTIVE";

export type User = {
  id: string;
  username: string;
  role: "ADMIN" | "SUPER_ADMIN";
  isActive: boolean;
  language: "EN" | "AR";
  createdAt: Date;
  updatedAt: Date;
  createdBy: {
    id: string;
    username: string;
  };
};

export type UsersPayload = PaginatedPayload & {
  search?: string;
  role?: UserRole;
  isActive?: boolean;
  orderBy?: "createdAt" | "username";
  orderType?: "asc" | "desc";
};