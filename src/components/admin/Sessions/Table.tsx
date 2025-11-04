"use client";

import DataTable, { Column } from "@/components/Table/DataTable";
import { User } from "@/models/user.model";
import {
  PencilSimpleLineIcon,
  TrashIcon,
  UserCheckIcon,
} from "@phosphor-icons/react/dist/ssr";
import AssignToDialog from "./AssignToDialog";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { DialogSettings } from "@/models/shared.model";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

const testUsers: User[] = [
  {
    id: "0",
    completeForms: 0,
    sessionName: "session name",
    username: "oliver.james / 123456789123456789123456789",
    assignee: "oliver james",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "1",
    completeForms: 1,
    sessionName: "session name",
    username: "emma.wilson / 123456789123456789123456789",
    assignee: "emma wilson",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "2",
    completeForms: 2,
    sessionName: "session name",
    username: "liam.miller / 123456789123456789123456789",
    assignee: "liam miller",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "3",
    completeForms: 3,
    sessionName: "session name",
    username: "ava.brown / 123456789123456789123456789",
    assignee: "ava brown",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "4",
    completeForms: 4,
    sessionName: "session name",
    username: "noah.davis / 123456789123456789123456789",
    assignee: "noah davis",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "5",
    completeForms: 5,
    sessionName: "session name",
    username: "sophia.garcia / 123456789123456789123456789",
    assignee: "sophia garcia",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "6",
    completeForms: 6,
    sessionName: "session name",
    username: "elijah.martin / 123456789123456789123456789",
    assignee: "elijah martin",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "7",
    completeForms: 7,
    sessionName: "session name",
    username: "isabella.lee / 123456789123456789123456789",
    assignee: "isabella lee",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "8",
    completeForms: 8,
    sessionName: "session name",
    username: "lucas.walker / 123456789123456789123456789",
    assignee: "lucas walker",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "9",
    completeForms: 9,
    sessionName: "session name",
    username: "mia.hall / 123456789123456789123456789",
    assignee: "mia hall",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "10",
    completeForms: 10,
    sessionName: "session name",
    username: "mason.allen / 123456789123456789123456789",
    assignee: "mason allen",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "11",
    completeForms: 11,
    sessionName: "session name",
    username: "amelia.young / 123456789123456789123456789",
    assignee: "amelia young",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "12",
    completeForms: 12,
    sessionName: "session name",
    username: "ethan.king / 123456789123456789123456789",
    assignee: "ethan king",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "13",
    completeForms: 13,
    sessionName: "session name",
    username: "charlotte.scott / 123456789123456789123456789",
    assignee: "charlotte scott",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "14",
    completeForms: 14,
    sessionName: "session name",
    username: "logan.green / 123456789123456789123456789",
    assignee: "logan green",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "15",
    completeForms: 15,
    sessionName: "session name",
    username: "harper.adams / 123456789123456789123456789",
    assignee: "harper adams",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "16",
    completeForms: 16,
    sessionName: "session name",
    username: "lucas.baker / 123456789123456789123456789",
    assignee: "lucas baker",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "17",
    completeForms: 17,
    sessionName: "session name",
    username: "evelyn.nelson / 123456789123456789123456789",
    assignee: "evelyn nelson",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "18",
    completeForms: 18,
    sessionName: "session name",
    username: "jackson.carter / 123456789123456789123456789",
    assignee: "jackson carter",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "19",
    completeForms: 19,
    sessionName: "session name",
    username: "zoe.mitchell / 123456789123456789123456789",
    assignee: "zoe mitchell",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "20",
    completeForms: 20,
    sessionName: "session name",
    username: "aiden.roberts / 123456789123456789123456789",
    assignee: "aiden roberts",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "21",
    completeForms: 21,
    sessionName: "session name",
    username: "chloe.turner / 123456789123456789123456789",
    assignee: "chloe turner",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "22",
    completeForms: 22,
    sessionName: "session name",
    username: "caleb.phillips / 123456789123456789123456789",
    assignee: "caleb phillips",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "23",
    completeForms: 23,
    sessionName: "session name",
    username: "lara.evans / 123456789123456789123456789",
    assignee: "lara evans",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "24",
    completeForms: 24,
    sessionName: "session name",
    username: "owen.cole / 123456789123456789123456789",
    assignee: "owen cole",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "25",
    completeForms: 25,
    sessionName: "session name",
    username: "nora.foster / 123456789123456789123456789",
    assignee: "nora foster",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "26",
    completeForms: 26,
    sessionName: "session name",
    username: "ryan.hughes / 123456789123456789123456789",
    assignee: "ryan hughes",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "27",
    completeForms: 27,
    sessionName: "session name",
    username: "ivy.morris / 123456789123456789123456789",
    assignee: "ivy morris",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "28",
    completeForms: 28,
    sessionName: "session name",
    username: "leo.ross / 123456789123456789123456789",
    assignee: "leo ross",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
  {
    id: "29",
    completeForms: 29,
    sessionName: "session name",
    username: "sienna.ward / 123456789123456789123456789",
    assignee: "sienna ward",
    sessionType: "Returnees",
    startDate: "22 May 2024",
  },
];

const Table = () => {
  const { t } = useTranslation();

  const columns: Column[] = [
    {
      header: () => t("SESSION_NAME"),
      value: (user: User) => user.sessionName,
    },
    {
      header: () => `${t("USERNAME")} / ${t("CASE_MANAGEMENT_NUMBER")}`,
      value: (user: User) => user.username,
      sortKey: "username",
    },
    {
      header: () => t("SESSION_TYPE"),
      value: (user: User) => user.sessionType,
    },
    {
      header: () => t("ASSIGNEE"),
      value: (user: User) => user.assignee,
    },
    {
      headerClassName: "w-20 pe-10",
      cellClassName: "w-20 pe-10",
      header: () => (
        <div className="w-full flex flex-col justify-center gap-2 py-2">
          <p>{t("COMPLETED_FORMS")}</p>

          <div className="flex flex-row justify-between gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="w-7 h-7 flex items-center justify-center bg-secondary text-primary rounded-full">
                  1
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("NEEDS_ASSESSMENT_TOOL")}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <p className="w-7 h-7 flex items-center justify-center bg-secondary text-primary rounded-full">
                  2
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("FAST_TRACK_EMPLOYMENT")}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <p className="w-7 h-7 flex items-center justify-center bg-secondary text-primary rounded-full">
                  3
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("EMPLOYMENT_PATHWAY")}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      ),
      value: (user: User) => (
        //user.completeForms
        <div className="flex flex-row justify-between gap-2">
          <p className="w-7 h-7 flex items-center justify-center bg-success text-white rounded-full">
            1
          </p>
          <p className="w-7 h-7 flex items-center justify-center bg-white text-success border border-success rounded-full">
            2
          </p>
          <p className="w-7 h-7 flex items-center justify-center bg-neutral-100 text-neutral-300 rounded-full">
            3
          </p>
        </div>
      ),
    },
    {
      header: () => t("START_DATE"),
      value: (user: User) => user.startDate,
    },
  ];

  const settings: DialogSettings[] = [
    {
      label: t("ASSIGN_TO"),
      icon: <UserCheckIcon className="fill-neutral-600" size={18} />,
      dialog: AssignToDialog,
    },
    {
      label: t("EDIT_SESSION"),
      icon: <PencilSimpleLineIcon className="fill-neutral-600" size={18} />,
      href: "#",
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
