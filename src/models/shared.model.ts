export type NameId = { name?: string; id?: string };

export type ServerResponse<T> = {
  data?: T;
  message?: string;
  error?: boolean;
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

export type DialogProps<T, Extra extends object = object> = {
  open: boolean;
  setOpen: (val: boolean) => void;
  item?: T;
  onAction?: (item: T) => void;
  closeOnAction?: boolean;
} & Extra;

export type DialogSettings<T = any> = {
  label: string;
  icon: React.ReactNode;
  href?: string | ((item?: T) => string);
  dialog?: React.ComponentType<any>;
  props?: Omit<DialogProps<any>, "open" | "setOpen" | "item"> &
    Record<string, any>;
};

export type UploadType = "user" | "category" | "item";

export type UploadFilePayload = {
  type: UploadType;
  id: string;
  file: File;
};
