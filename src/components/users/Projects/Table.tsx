"use client";

import DataTable, { Column } from "@/components/Table/DataTable";
import { User } from "@/models/user.model";
import {
  ArrowBendUpLeftIcon,
  ClipboardTextIcon,
  PencilSimpleLineIcon,
  TrashIcon,
} from "@phosphor-icons/react/dist/ssr";
import EditProjectDialog from "./EditProjectDialog";
import MoveSessionDialog from "./MoveSessionDialog";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { DialogSettings } from "@/models/shared.model";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/lib/staticKeys";

const testUsers: User[] = [
  {
    id: "0",
    projectName: "oliver.james",
    sessionType: "Returnees",
    sessionNumber: 0,
    date: "22 May 2024",
  },
  {
    id: "1",
    projectName: "emma.wilson",
    sessionType: "Returnees",
    sessionNumber: 1,
    date: "22 May 2024",
  },
  {
    id: "2",
    projectName: "liam.miller",
    sessionType: "Returnees",
    sessionNumber: 2,
    date: "22 May 2024",
  },
  {
    id: "3",
    projectName: "ava.brown",
    sessionType: "Returnees",
    sessionNumber: 3,
    date: "22 May 2024",
  },
  {
    id: "4",
    projectName: "noah.davis",
    sessionType: "Returnees",
    sessionNumber: 4,
    date: "22 May 2024",
  },
  {
    id: "5",
    projectName: "sophia.garcia",
    sessionType: "Returnees",
    sessionNumber: 5,
    date: "22 May 2024",
  },
  {
    id: "6",
    projectName: "elijah.martin",
    sessionType: "Returnees",
    sessionNumber: 6,
    date: "22 May 2024",
  },
  {
    id: "7",
    projectName: "isabella.lee",
    sessionType: "Returnees",
    sessionNumber: 7,
    date: "22 May 2024",
  },
  {
    id: "8",
    projectName: "lucas.walker",
    sessionType: "Returnees",
    sessionNumber: 8,
    date: "22 May 2024",
  },
  {
    id: "9",
    projectName: "mia.hall",
    sessionType: "Returnees",
    sessionNumber: 9,
    date: "22 May 2024",
  },
  {
    id: "10",
    projectName: "mason.allen",
    sessionType: "Returnees",
    sessionNumber: 0,
    date: "22 May 2024",
  },
  {
    id: "11",
    projectName: "amelia.young",
    sessionType: "Returnees",
    sessionNumber: 1,
    date: "22 May 2024",
  },
  {
    id: "12",
    projectName: "ethan.king",
    sessionType: "Returnees",
    sessionNumber: 2,
    date: "22 May 2024",
  },
  {
    id: "13",
    projectName: "charlotte.scott",
    sessionType: "Returnees",
    sessionNumber: 3,
    date: "22 May 2024",
  },
  {
    id: "14",
    projectName: "logan.green",
    sessionType: "Returnees",
    sessionNumber: 4,
    date: "22 May 2024",
  },
  {
    id: "15",
    projectName: "harper.adams",
    sessionType: "Returnees",
    sessionNumber: 5,
    date: "22 May 2024",
  },
  {
    id: "16",
    projectName: "lucas.baker",
    sessionType: "Returnees",
    sessionNumber: 6,
    date: "22 May 2024",
  },
  {
    id: "17",
    projectName: "evelyn.nelson",
    sessionType: "Returnees",
    sessionNumber: 7,
    date: "22 May 2024",
  },
  {
    id: "18",
    projectName: "jackson.carter",
    sessionType: "Returnees",
    sessionNumber: 8,
    date: "22 May 2024",
  },
  {
    id: "19",
    projectName: "zoe.mitchell",
    sessionType: "Returnees",
    sessionNumber: 9,
    date: "22 May 2024",
  },
  {
    id: "20",
    projectName: "aiden.roberts",
    sessionType: "Returnees",
    sessionNumber: 0,
    date: "22 May 2024",
  },
  {
    id: "21",
    projectName: "chloe.turner",
    sessionType: "Returnees",
    sessionNumber: 1,
    date: "22 May 2024",
  },
  {
    id: "22",
    projectName: "caleb.phillips",
    sessionType: "Returnees",
    sessionNumber: 2,
    date: "22 May 2024",
  },
  {
    id: "23",
    projectName: "lara.evans",
    sessionType: "Returnees",
    sessionNumber: 3,
    date: "22 May 2024",
  },
  {
    id: "24",
    projectName: "owen.cole",
    sessionType: "Returnees",
    sessionNumber: 4,
    date: "22 May 2024",
  },
  {
    id: "25",
    projectName: "nora.foster",
    sessionType: "Returnees",
    sessionNumber: 5,
    date: "22 May 2024",
  },
  {
    id: "26",
    projectName: "ryan.hughes",
    sessionType: "Returnees",
    sessionNumber: 6,
    date: "22 May 2024",
  },
  {
    id: "27",
    projectName: "ivy.morris",
    sessionType: "Returnees",
    sessionNumber: 7,
    date: "22 May 2024",
  },
  {
    id: "28",
    projectName: "leo.ross",
    sessionType: "Returnees",
    sessionNumber: 8,
    date: "22 May 2024",
  },
  {
    id: "29",
    projectName: "sienna.ward",
    sessionType: "Returnees",
    sessionNumber: 9,
    date: "22 May 2024",
  },
];

const Table = () => {
  const { t } = useTranslation();

  const columns: Column[] = [
    {
      header: () => t("PROJECT_NAME"),
      value: (user: User) => user.projectName,
    },
    {
      header: () => t("SESSION_TYPE"),
      value: (user: User) => user.sessionType,
    },
    {
      header: () => t("SESSIONS"),
      value: (user: User) => (
        <Link
          href={`${ROUTES.projects.url}/${user.id}${ROUTES.sessions.url}`}
          className="text-primary underline underline-offset-4"
        >
          {user.sessionNumber || 0}
        </Link>
      ),
      sortKey: "username",
    },
    {
      header: () => t("DATE"),
      value: (user: User) => user.date,
    },
  ];

  const settings: DialogSettings[] = [
    {
      label: t("ADD_SESSION"),
      icon: <ClipboardTextIcon className="fill-neutral-600" size={18} />,
      href: "#",
    },
    {
      label: t("MOVE_SESSION"),
      icon: <ArrowBendUpLeftIcon className="fill-neutral-600" size={18} />,
      dialog: MoveSessionDialog,
    },
    {
      label: t("EDIT"),
      icon: <PencilSimpleLineIcon className="fill-neutral-600" size={18} />,
      dialog: EditProjectDialog,
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
