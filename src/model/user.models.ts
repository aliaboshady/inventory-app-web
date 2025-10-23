export type UserRole = "ADMIN" | "SUPER_ADMIN";
export type UserStatus = "ACTIVE" | "INACTIVE";

export type User = {
  id: string;
  username: string;
  role: UserRole;
  status: UserStatus;
}
