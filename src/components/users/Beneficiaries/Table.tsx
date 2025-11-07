"use client";

import DataTable, { Column } from "@/components/Table/DataTable";
import { User } from "@/models/user.model";
import {
  PencilSimpleLineIcon,
  TrashIcon,
} from "@phosphor-icons/react/dist/ssr";
import EditBeneficiaryDialog from "./EditBeneficiaryDialog";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { DialogSettings } from "@/models/shared.model";
import { useTranslation } from "react-i18next";

const testUsers: User[] = [
  {
    _id: "0",
    username: "oliver.james / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "1",
    username: "emma.wilson / 123456789123456789123456789",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "2",
    username: "liam.miller / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "3",
    username: "ava.brown / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "4",
    username: "noah.davis / 123456789123456789123456789",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "5",
    username: "sophia.garcia / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "6",
    username: "elijah.martin / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "7",
    username: "isabella.lee / 123456789123456789123456789",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "8",
    username: "lucas.walker / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "9",
    username: "mia.hall / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "10",
    username: "mason.allen / 123456789123456789123456789",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "11",
    username: "amelia.young / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "12",
    username: "ethan.king / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "13",
    username: "charlotte.scott / 123456789123456789123456789",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "14",
    username: "logan.green / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "15",
    username: "harper.adams / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "16",
    username: "lucas.baker / 123456789123456789123456789",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "17",
    username: "evelyn.nelson / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "18",
    username: "jackson.carter / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "19",
    username: "zoe.mitchell / 123456789123456789123456789",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "20",
    username: "aiden.roberts / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "21",
    username: "chloe.turner / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "22",
    username: "caleb.phillips / 123456789123456789123456789",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "23",
    username: "lara.evans / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "24",
    username: "owen.cole / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "25",
    username: "nora.foster / 123456789123456789123456789",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "26",
    username: "ryan.hughes / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "27",
    username: "ivy.morris / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "28",
    username: "leo.ross / 123456789123456789123456789",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    _id: "29",
    username: "sienna.ward / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
];

const Table = () => {
  const { t } = useTranslation();

  const columns: Column[] = [
    {
      header: () => t("USER_ID"),
      value: (user: User) => user._id,
    },
    {
      header: () => `${t("USERNAME")} / ${t("CASE_MANAGEMENT_NUMBER")}`,
      value: (user: User) => user.username,
      sortKey: "username",
    },
    {
      header: () => t("BENEFICIARY_NAME"),
      value: (user: User) => user.beneficiaryName,
    },
    {
      header: () => t("SESSION_TYPE"),
      value: (user: User) => user.sessionType,
    },
  ];

  const settings: DialogSettings[] = [
    {
      label: t("EDIT"),
      icon: <PencilSimpleLineIcon className="fill-neutral-600" size={18} />,
      dialog: EditBeneficiaryDialog,
    },
    {
      label: t("DELETE"),
      icon: <TrashIcon className="fill-red-600" size={18} />,
      dialog: ConfirmationDialog,
      onAction: (user: User) => console.log("DELETE: ", user?.username),
    },
  ];

  return (
    <DataTable
      items={testUsers}
      columns={columns}
      sortBy="username"
      sortType="DESC"
      itemsPerPage={10}
      page={1}
      dataPagination={{
        data: {
          data: testUsers,
          limit: 10,
          totalItems: 100,
          page: 1,
          totalPages: 10,
          hasPreviousPage: false,
          hasNextPage: false,
        },
        message: "",
      }}
      settings={settings}
    />
  );
};

export default Table;
