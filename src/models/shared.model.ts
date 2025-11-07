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
  itemsPerPage: number;
};

export type Paginated<T> = {
  data: T[];
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
};

export type SortType = "ASC" | "DESC";

export type Dir = "ltr" | "rtl";

export type DialogProps<T> = {
  open: boolean;
  setOpen: (val: boolean) => void;
  item?: T;
  onAction?: (item: T) => void;
  closeOnAction?: boolean;
};

export type DialogSettings = {
  label: string;
  icon: React.ReactNode;
  href?: string;
  dialog?: React.ComponentType<DialogProps<any>>;
  onAction?: (item: any) => void;
  closeOnAction?: boolean;
};
