"use client";

import DataTable, { Column } from "@/components/Table/DataTable";
import Badge from "@/components/Badge";
import { User, UsersPayload } from "@/models/user.model";
import {
  PencilSimpleLineIcon,
  TrashIcon,
} from "@phosphor-icons/react/dist/ssr";
import EditUserDialog from "./EditUserDialog";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { DialogSettings, Paginated } from "@/models/shared.model";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import useRequest from "@/hooks/useRequest";
import { getUsers } from "@/actions/users/getUsers";
import { formatDate } from "@/lib/utils";

const Table = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { request: fetch, data } = useRequest<UsersPayload, Paginated<User>>(
    getUsers
  );

  useEffect(() => {
    fetch({ page, itemsPerPage });
  }, [page, itemsPerPage]);

  useEffect(() => {
    console.log("🚀 ~ Table ~ data:", data);
  }, [data]);

  const columns: Column[] = [
    {
      header: () => t("EMAIL"),
      value: (user: User) => user.email,
    },
    {
      header: () => t("NAME"),
      value: (user: User) => `${user.firstName} ${user.lastName}`,
      sortKey: "firstName",
    },
    {
      header: () => t("ROLE"),
      value: (user: User) => (
        <Badge className={user.role === "STAFF" && "text-primary bg-secondary"}>
          {user.role}
        </Badge>
      ),
    },
    {
      header: () => t("CREATED_AT"),
      value: (user: User) => formatDate(user?.createdAt),
      sortKey: "createdAt",
    },
    {
      header: () => t("UPDATE_AT"),
      value: (user: User) => formatDate(user?.updatedAt),
      sortKey: "updatedAt",
    },
  ];

  const settings: DialogSettings[] = [
    {
      label: t("EDIT"),
      icon: <PencilSimpleLineIcon className="fill-neutral-600" size={18} />,
      dialog: EditUserDialog,
    },
    {
      label: t("DELETE"),
      icon: <TrashIcon className="fill-red-600" size={18} />,
      dialog: ConfirmationDialog,
      onAction: (user: User) => console.log("DELETE: ", user?.firstName),
    },
  ];

  return (
    <DataTable
      items={data?.data}
      columns={columns}
      sortBy="username"
      sortType="DESC"
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
