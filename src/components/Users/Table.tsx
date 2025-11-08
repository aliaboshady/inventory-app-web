"use client";

import DataTable, { Column } from "@/components/Table/DataTable";
import Badge from "@/components/Badge";
import { User, UserRole, UsersPayload } from "@/models/user.model";
import {
  KeyIcon,
  PencilSimpleLineIcon,
  TrashIcon,
} from "@phosphor-icons/react/dist/ssr";
import EditUserDialog from "./EditUserDialog";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { DialogSettings, Paginated } from "@/models/shared.model";
import { useTranslation } from "react-i18next";

import { formatDate } from "@/lib/utils";
import { deleteUser } from "@/actions/users/deleteUser";
import ChangeUserPasswordDialog from "./ChangeUserPasswordDialog";

type Props = {
  data: Paginated<User>;
  setPage: (val: number) => void;
  page: number;
  setItemsPerPage: (val: number) => void;
  itemsPerPage: number;
  role: string;
  search: string;
  fetch: (payload: UsersPayload) => Promise<Paginated<User>>;
  me: User;
};

const Table = ({
  data,
  role,
  search,
  page = 1,
  setPage,
  itemsPerPage = 10,
  setItemsPerPage,
  fetch,
  me
}: Props) => {
  const { t } = useTranslation();

  const columns: Column[] = [
    {
      header: () => t("EMAIL"),
      value: (user: User) => user.email,
    },
    {
      header: () => t("NAME"),
      value: (user: User) => `${user.firstName} ${user.lastName}`,
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
    },
  ];

  const settings: DialogSettings[] = [
    {
      label: t("EDIT"),
      icon: <PencilSimpleLineIcon className="fill-neutral-600" size={18} />,
      dialog: EditUserDialog,
      onAction: async () => {
        fetch({ page, itemsPerPage, role: role as UserRole, search });
      },
      closeOnAction: true,
    },
    {
      label: t("CHANGE_PASSWORD"),
      icon: <KeyIcon className="fill-neutral-600" size={18} />,
      dialog: ChangeUserPasswordDialog,
      onAction: async () => {
        fetch({ page, itemsPerPage, role: role as UserRole, search });
      },
      closeOnAction: true,
    },
    {
      label: t("DELETE"),
      icon: <TrashIcon className="fill-red-600" size={18} />,
      dialog: ConfirmationDialog,
      onAction: async (user: User) => {
        await deleteUser(user._id);
        fetch({ page, itemsPerPage, role: role as UserRole, search });
      },
      closeOnAction: true,
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
      settings={me && me.role === "ADMIN" && settings}
    />
  );
};

export default Table;
