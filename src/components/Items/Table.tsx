"use client";

import DataTable, { Column } from "@/components/Table/DataTable";
import {
  PencilSimpleLineIcon,
  TrashIcon,
} from "@phosphor-icons/react/dist/ssr";
import EditItemDialog from "./EditItemDialog";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import {
  DialogSettings,
  Paginated,
  ServerResponse,
} from "@/models/shared.model";
import { useTranslation } from "react-i18next";
import { formatDate } from "@/lib/utils";
import { Item, ItemsPayload } from "@/models/item.model";
import { Badge } from "../ui/badge";
import { deleteItem } from "@/actions/items/deleteItem";
import Avatar from "../Avatar";
import QRCodeDialog from "./QRCodeDialog";
import useRequest from "@/hooks/useRequest";

type Props = {
  data: Paginated<Item>;
  setPage: (val: number) => void;
  page: number;
  setItemsPerPage: (val: number) => void;
  itemsPerPage: number;
  name: string;
  id: string;
  fetch: (payload: ItemsPayload) => Promise<ServerResponse<Paginated<Item>>>;
};

const Table = ({
  data,
  name,
  id,
  page = 1,
  setPage,
  itemsPerPage = 10,
  setItemsPerPage,
  fetch,
}: Props) => {
  const { t } = useTranslation();

  const { request: deleteItemReq } = useRequest<string, ServerResponse<void>>(
    deleteItem,
    {
      showSuccessToast: true,
      successToastMessage: "ITEM_DELETE_SUCCESSFUL",
    }
  );

  const columns: Column[] = [
    {
      header: () => t("QR_CODE"),
      value: (item: Item) => (
        <QRCodeDialog
          item={item}
          onAction={() => fetch({ page, itemsPerPage, _id: id })}
        />
      ),
    },
    {
      header: () => t("ID"),
      value: (item: Item) => (
        <Avatar
          label={item?._id}
          src={item?.imageURL}
          type="category"
          className="md:w-16 md:h-16"
        />
      ),
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
          {t(item?.status)}
        </Badge>
      ),
    },
    {
      header: () => t("NAME"),
      value: (item: Item) => item?.name,
    },
    {
      header: () => t("COLOR"),
      value: (item: Item) => (
        <div className="flex flex-row items-center gap-4">
          <div
            className="w-8 h-4"
            style={{ backgroundColor: item?.color?.color }}
          />
          <p className="truncate">{item?.color?.name}</p>
        </div>
      ),
    },
    {
      header: () => t("WIDTH_CM"),
      value: (item: Item) => (
        <p dir="ltr" className="rtl:text-end">
          {item?.width || 0}
        </p>
      ),
    },
    {
      header: () => t("LENGTH_CM"),
      value: (item: Item) => (
        <p dir="ltr" className="rtl:text-end">
          {item?.length || 0}
        </p>
      ),
    },
    {
      header: () => t("HEIGHT_CM"),
      value: (item: Item) => (
        <p dir="ltr" className="rtl:text-end">
          {item?.height || 0}
        </p>
      ),
    },
    {
      header: () => t("COMMENT"),
      value: (item: Item) => item?.comment,
    },
    {
      header: () => t("UPDATED_AT"),
      value: (item: Item) => (
        <p dir="ltr" className="rtl:text-end">
          {formatDate(item?.updatedAt)}
        </p>
      ),
    },
    {
      header: () => t("CREATED_AT"),
      value: (item: Item) => (
        <p dir="ltr" className="rtl:text-end">
          {formatDate(item?.createdAt)}
        </p>
      ),
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
        await deleteItemReq(item._id);
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
