"use client";

import DataTable, { Column } from "@/components/Table/DataTable";
import Badge from "@/components/Badge";
import { User } from "@/model/user.models";
import {
  PencilSimpleLineIcon,
  TrashIcon,
} from "@phosphor-icons/react/dist/ssr";
import EditBeneficiaryDialog from "./EditBeneficiaryDialog";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { DialogSettings } from "@/model/shared.models";

const testUsers: User[] = [
  {
    id: "0",
    username: "oliver.james / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "1",
    username: "emma.wilson / 123456789123456789123456789",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "2",
    username: "liam.miller / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "3",
    username: "ava.brown / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "4",
    username: "noah.davis / 123456789123456789123456789",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "5",
    username: "sophia.garcia / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "6",
    username: "elijah.martin / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "7",
    username: "isabella.lee / 123456789123456789123456789",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "8",
    username: "lucas.walker / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "9",
    username: "mia.hall / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "10",
    username: "mason.allen / 123456789123456789123456789",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "11",
    username: "amelia.young / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "12",
    username: "ethan.king / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "13",
    username: "charlotte.scott / 123456789123456789123456789",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "14",
    username: "logan.green / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "15",
    username: "harper.adams / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "16",
    username: "lucas.baker / 123456789123456789123456789",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "17",
    username: "evelyn.nelson / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "18",
    username: "jackson.carter / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "19",
    username: "zoe.mitchell / 123456789123456789123456789",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "20",
    username: "aiden.roberts / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "21",
    username: "chloe.turner / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "22",
    username: "caleb.phillips / 123456789123456789123456789",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "23",
    username: "lara.evans / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "24",
    username: "owen.cole / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "25",
    username: "nora.foster / 123456789123456789123456789",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "26",
    username: "ryan.hughes / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "27",
    username: "ivy.morris / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "28",
    username: "leo.ross / 123456789123456789123456789",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
  {
    id: "29",
    username: "sienna.ward / 123456789123456789123456789",
    status: "ACTIVE",
    role: "ADMIN",
    beneficiaryName: "Beneficiary Name",
    sessionType: "Returnees",
  },
];

const columns: Column[] = [
  {
    header: "User ID",
    value: (user: User) => user.id,
  },
  {
    header: "Username / case management number",
    value: (user: User) => user.username,
    sortKey: "username",
  },
  {
    header: "Beneficiary Name",
    value: (user: User) => user.beneficiaryName,
  },
  {
    header: "Session Type",
    value: (user: User) => user.sessionType,
  },
];

const settings: DialogSettings[] = [
  {
    label: "Edit",
    icon: <PencilSimpleLineIcon className="fill-neutral-600" size={18} />,
    dialog: EditBeneficiaryDialog,
  },
  {
    label: "Delete",
    icon: <TrashIcon className="fill-red-600" size={18} />,
    dialog: ConfirmationDialog,
    onAction: (user: User) => console.log("DELETE: ", user?.username),
  },
];

const Table = () => {
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
          itemsPerPage: 10,
          totalItems: 100,
          currentPage: 1,
          totalPages: 10,
        },
        message: "",
      }}
      settings={settings}
    />
  );
};

export default Table;
