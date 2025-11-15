import { Category } from "./category.model";
import { PaginatedPayload } from "./shared.model";

export type ItemStatus = "IN_WAREHOUSE" | "OUT_OF_WAREHOUSE" | "UNKNOWN";

export type Item = {
  _id: string;
  category: Category;
  status: ItemStatus;
  name: string;
  comment: string;
  imageURL: string;
  createdAt: string;
  updatedAt: string;
};

export type ItemsPayload = PaginatedPayload & {
  _id?: string;
  name?: string;
  category?: string;
  color?: string;
  status?: ItemStatus;
};

export type CreateItemPayload = {
  category: string;
  status: ItemStatus;
  name: string;
  comment: string;
};

export type EditItemPayload = {
  _id: string;
  category?: string;
  status?: ItemStatus;
  name?: string;
  comment?: string;
};
