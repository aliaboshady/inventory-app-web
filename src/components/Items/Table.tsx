"use client";

import DataTable, { Column } from "@/components/Table/DataTable";
import {
  PencilSimpleLineIcon,
  TrashIcon,
} from "@phosphor-icons/react/dist/ssr";
import EditItemDialog from "./EditItemDialog";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { DialogSettings, Paginated } from "@/models/shared.model";
import { useTranslation } from "react-i18next";
import { formatDate } from "@/lib/utils";
import { Item, ItemsPayload } from "@/models/item.model";
import { Badge } from "../ui/badge";
import { deleteItem } from "@/actions/items/deleteItem";

type Props = {
  data: Paginated<Item>;
  setPage: (val: number) => void;
  page: number;
  setItemsPerPage: (val: number) => void;
  itemsPerPage: number;
  name: string;
  fetch: (payload: ItemsPayload) => Promise<Paginated<Item>>;
};

const Table = ({
  data,
  name,
  page = 1,
  setPage,
  itemsPerPage = 10,
  setItemsPerPage,
  fetch,
}: Props) => {
  const { t } = useTranslation();

  const columns: Column[] = [
    {
      header: () => t("ID"),
      value: (item: Item) => item?._id,
    },
    {
      header: () => t("CATEGORY"),
      value: (item: Item) => item?.category?.name,
    },
    {
      header: () => t("STATUS"),
      value: (item: Item) => (
        <Badge
          className={
            item?.status === "IN_WAREHOUSE"
              ? "text-success bg-success-foreground"
              : item?.status === "OUT_OF_WAREHOUSE"
              ? "text-primary bg-secondary/70"
              : "text-danger bg-danger-foreground"
          }
        >
          {item?.status}
        </Badge>
      ),
    },
    {
      header: () => t("NAME"),
      value: (item: Item) => item?.name,
    },
    {
      header: () => t("COMMENT"),
      value: (item: Item) => item?.comment,
    },
    {
      header: () => t("UPDATED_AT"),
      value: (item: Item) => formatDate(item?.updatedAt),
    },
    {
      header: () => t("CREATED_AT"),
      value: (item: Item) => formatDate(item?.createdAt),
    },
  ];

  const settings: DialogSettings[] = [
    {
      label: t("EDIT"),
      icon: <PencilSimpleLineIcon className="fill-neutral-600" size={18} />,
      dialog: EditItemDialog,
      onAction: async () => {
        fetch({ page, itemsPerPage, name });
      },
      closeOnAction: true,
    },
    {
      label: t("DELETE"),
      icon: <TrashIcon className="fill-red-600" size={18} />,
      dialog: ConfirmationDialog,
      onAction: async (item: Item) => {
        await deleteItem(item._id);
        fetch({ page, itemsPerPage, name });
      },
      closeOnAction: true,
    },
  ];

  return (
    <DataTable
      items={data?.data}
      columns={columns}
      itemsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
      page={page}
      setPage={setPage}
      dataPagination={data}
      settings={settings}
    />
  );
};

export default Table;
