"use client";

import DataTable, { Column } from "@/components/Table/DataTable";
import Badge from "@/components/Badge";
import { User } from "@/model/user.models";
import TableSettings from "./TableSettings";

const testUsers: User[] = [
  {
    id: "0",
    username: "oliver.james",
    status: "ACTIVE",
    role: "ADMIN",
  },
  {
    id: "1",
    username: "emma.wilson",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
  },
  { id: "2", username: "liam.miller", status: "ACTIVE", role: "ADMIN" },
  { id: "3", username: "ava.brown", status: "ACTIVE", role: "ADMIN" },
  {
    id: "4",
    username: "noah.davis",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
  },
  {
    id: "5",
    username: "sophia.garcia",
    status: "ACTIVE",
    role: "ADMIN",
  },
  {
    id: "6",
    username: "elijah.martin",
    status: "ACTIVE",
    role: "ADMIN",
  },
  {
    id: "7",
    username: "isabella.lee",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
  },
  {
    id: "8",
    username: "lucas.walker",
    status: "ACTIVE",
    role: "ADMIN",
  },
  { id: "9", username: "mia.hall", status: "ACTIVE", role: "ADMIN" },
  {
    id: "10",
    username: "mason.allen",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
  },
  {
    id: "11",
    username: "amelia.young",
    status: "ACTIVE",
    role: "ADMIN",
  },
  { id: "12", username: "ethan.king", status: "ACTIVE", role: "ADMIN" },
  {
    id: "13",
    username: "charlotte.scott",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
  },
  {
    id: "14",
    username: "logan.green",
    status: "ACTIVE",
    role: "ADMIN",
  },
  {
    id: "15",
    username: "harper.adams",
    status: "ACTIVE",
    role: "ADMIN",
  },
  {
    id: "16",
    username: "lucas.baker",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
  },
  {
    id: "17",
    username: "evelyn.nelson",
    status: "ACTIVE",
    role: "ADMIN",
  },
  {
    id: "18",
    username: "jackson.carter",
    status: "ACTIVE",
    role: "ADMIN",
  },
  {
    id: "19",
    username: "zoe.mitchell",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
  },
  {
    id: "20",
    username: "aiden.roberts",
    status: "ACTIVE",
    role: "ADMIN",
  },
  {
    id: "21",
    username: "chloe.turner",
    status: "ACTIVE",
    role: "ADMIN",
  },
  {
    id: "22",
    username: "caleb.phillips",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
  },
  { id: "23", username: "lara.evans", status: "ACTIVE", role: "ADMIN" },
  { id: "24", username: "owen.cole", status: "ACTIVE", role: "ADMIN" },
  {
    id: "25",
    username: "nora.foster",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
  },
  {
    id: "26",
    username: "ryan.hughes",
    status: "ACTIVE",
    role: "ADMIN",
  },
  { id: "27", username: "ivy.morris", status: "ACTIVE", role: "ADMIN" },
  {
    id: "28",
    username: "leo.ross",
    status: "INACTIVE",
    role: "SUPER_ADMIN",
  },
  {
    id: "29",
    username: "sienna.ward",
    status: "ACTIVE",
    role: "ADMIN",
  },
];

const columns: Column[] = [
  {
    header: "Username",
    value: (user: User) => user.username,
    sortKey: "username",
  },
  {
    header: "Role",
    value: (user: User) => (
      <Badge className={user.role === "ADMIN" && "text-primary bg-secondary"}>
        {user.role}
      </Badge>
    ),
  },
  {
    header: "Status",
    value: (user: User) => (
      <Badge
        className={
          user.status === "ACTIVE"
            ? "text-success bg-success-foreground"
            : "text-danger bg-danger-foreground"
        }
      >
        {user.status}
      </Badge>
    ),
  },
  {
    header: "",
    cellClassName: "w-1 max-w-1",
    value: (user: User) => <TableSettings user={user} onUpdate={() => {}} />,
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
    />
  );
};

export default Table;
