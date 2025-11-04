export type NameId = { name?: string; id?: string };

export type ServerResponse<T> = {
  data?: T;
  message?: string;
  error?: ErrorResponse;
};

export type ErrorResponse = {
  general: string[];
} & {
  [key: string]: string[];
};

export type PaginatedPayload = {
  page: number;
  limit: number;
};

export type Paginated<T> = {
  data: T[];
  limit: number;
  totalItems: number;
  page: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type PaginatedResponse<T> = ServerResponse<Paginated<T>>;

export type SortType = "ASC" | "DESC";

export type Dir = "ltr" | "rtl";

export type DialogProps<T> = {
  open: boolean;
  setOpen: (val: boolean) => void;
  item?: T;
  onAction?: (item: T) => void;
};

export type DialogSettings = {
  label: string;
  icon: React.ReactNode;
  href?: string;
  dialog?: React.ComponentType<DialogProps<any>>;
  onAction?: (item: any) => void;
};
