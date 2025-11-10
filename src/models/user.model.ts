import { PaginatedPayload } from "./shared.model";

export type Auth = {
  accessToken: string;
  user: User;
};

export type UserRole = "ADMIN" | "STAFF";

export type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  imageURL: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  password: string;
};

export type CreateUserPayload = {
  firstName: string;
  lastName: string;
  role: UserRole;
  email: string;
  password: string;
};

export type EditUserPayload = Omit<CreateUserPayload, "password"> & {
  _id: string;
};

export type ChangeUserPasswordPayload = {
  _id: string;
  password: string;
};

export type UsersPayload = PaginatedPayload & {
  search?: string;
  role?: UserRole;
  orderBy?: "createdAt" | "username";
  orderType?: "asc" | "desc";
};
