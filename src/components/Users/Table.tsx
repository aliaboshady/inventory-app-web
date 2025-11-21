"use client";

import DataTable, { Column } from "@/components/Table/DataTable";
import { User, UserRole, UsersPayload } from "@/models/user.model";
import {
  KeyIcon,
  PencilSimpleLineIcon,
  TrashIcon,
  UserIcon,
} from "@phosphor-icons/react/dist/ssr";
import EditUserDialog from "./EditUserDialog";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import {
  DialogSettings,
  Paginated,
  ServerResponse,
} from "@/models/shared.model";
import { useTranslation } from "react-i18next";
import { formatDate } from "@/lib/utils";
import { deleteUser } from "@/actions/users/deleteUser";
import ChangeUserPasswordDialog from "./ChangeUserPasswordDialog";
import { Badge } from "../ui/badge";
import Avatar from "../Avatar";
import useRequest from "@/hooks/useRequest";

type Props = {
  data: Paginated<User>;
  setPage: (val: number) => void;
  page: number;
  setItemsPerPage: (val: number) => void;
  itemsPerPage: number;
  role: string;
  search: string;
  fetch: (payload: UsersPayload) => Promise<ServerResponse<Paginated<User>>>;
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
  me,
}: Props) => {
  const { t } = useTranslation();

  const { request: deleteUserReq } = useRequest<string, ServerResponse<void>>(
    deleteUser,
    {
      showSuccessToast: true,
      successToastMessage: "USER_DELETE_SUCCESSFUL",
    }
  );

  const columns: Column[] = [
    {
      header: () => t("NAME"),
      value: (user: User) => (
        <Avatar
          label={`${user.firstName} ${user.lastName}`}
          src={user?.imageURL}
          type="user"
        />
      ),
    },
    {
      header: () => t("EMAIL"),
      value: (user: User) => user?.email,
    },
    {
      header: () => t("ROLE"),
      value: (user: User) => (
        <Badge className={user.role === "STAFF" && "text-primary bg-secondary"}>
          {t(user.role)}
        </Badge>
      ),
    },
    {
      header: () => t("CREATED_AT"),
      value: (user: User) => (
        <p dir="ltr" className="rtl:text-end">
          {formatDate(user?.createdAt)}
        </p>
      ),
    },
  ];

  const settings: DialogSettings[] = [
    {
      label: t("EDIT"),
      icon: <PencilSimpleLineIcon className="fill-neutral-600" size={18} />,
      dialog: EditUserDialog,
      props: {
        onAction: async () => {
          fetch({ page, itemsPerPage, role: role as UserRole, search });
        },
      },
    },
    {
      label: t("CHANGE_PASSWORD"),
      icon: <KeyIcon className="fill-neutral-600" size={18} />,
      dialog: ChangeUserPasswordDialog,
      props: {
        onAction: async () => {
          fetch({ page, itemsPerPage, role: role as UserRole, search });
        },
      },
    },
    {
      label: t("DELETE"),
      icon: <TrashIcon className="fill-red-600" size={18} />,
      dialog: ConfirmationDialog,
      props: {
        onAction: async (user: User) => {
          await deleteUserReq(user._id);
          fetch({ page, itemsPerPage, role: role as UserRole, search });
        },
      },
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
      settings={me && me.role === "ADMIN" && settings}
    />
  );
};

export default Table;
