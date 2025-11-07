"use client";

import TextInput from "@/components/TextInput";
import Dropdown from "@/components/Dropdown";
import { Button } from "@/components/ui/button";
import { useResponsiveSize } from "@/hooks/useResponsiveSize";
import { getTailwindColor } from "@/lib/utils";
import { MagnifyingGlassIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import EditUserDialog from "./EditUserDialog";

type Props = {
  role: string;
  setRole: (val: string) => void;
  search: string;
  setSearch: (val: string) => void;
  onAddUser: () => void;
};

const Filter = ({ role, setRole, search, setSearch, onAddUser }: Props) => {
  const { t } = useTranslation();
  const [openAddAdmin, setOpenAddAdmin] = useState<boolean>(false);

  const {
    containerRef,
    outFlags: {
      width: [breakpoint1, breakpoint2],
    },
  } = useResponsiveSize({
    breakpoints: [725, 440],
  });

  const roles = [
    { value: "ADMIN", label: "ADMIN" },
    { value: "STAFF", label: "STAFF" },
  ];

  return (
    <>
      <div
        ref={containerRef}
        className={`flex gap-4 ${
          breakpoint1 ? "flex-col" : "flex-row justify-between items-center"
        } ${breakpoint2 ? "items-stretch" : "items-end"}`}
      >
        <div
          className={`flex gap-4 w-full ${
            breakpoint2 ? "flex-col" : "flex-row"
          }`}
        >
          <TextInput
            placeholder={t("SEARCH")}
            value={search || ""}
            setValue={setSearch}
            icon={
              <MagnifyingGlassIcon
                size={25}
                color={getTailwindColor("neutral-500")}
              />
            }
            className={`rounded-xl ${
              breakpoint2 ? "w-full" : breakpoint1 ? "w-2/3" : "w-96"
            }`}
            inputClassName="h-12"
          />

          <Dropdown
            items={roles}
            selected={role}
            placeholder={t("ROLE")}
            setSelected={setRole}
            showNoneOption
            className={breakpoint2 ? "w-full" : breakpoint1 ? "w-1/3" : "w-40"}
          />
        </div>

        <Button
          onClick={() => setOpenAddAdmin(true)}
          className="h-12 rounded-xl text-lg"
        >
          <PlusIcon color="white" weight="bold" /> {t("ADD_ADMIN")}
        </Button>
      </div>

      <EditUserDialog
        open={openAddAdmin}
        setOpen={setOpenAddAdmin}
        onAction={onAddUser}
      />
    </>
  );
};

export default Filter;
