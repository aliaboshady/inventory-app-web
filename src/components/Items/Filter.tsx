"use client";

import TextInput from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import { getTailwindColor } from "@/lib/utils";
import { MagnifyingGlassIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import EditItemDialog from "./EditItemDialog";
import { ItemStatus } from "@/models/item.model";
import Dropdown from "../Dropdown";

type Props = {
  name: string;
  setName: (val: string) => void;
  id: string;
  setId: (val: string) => void;
  status: ItemStatus;
  setStatus: (val: ItemStatus) => void;
  onAddUser: () => void;
};

const Filter = ({
  name,
  setName,
  id,
  setId,
  status,
  setStatus,
  onAddUser,
}: Props) => {
  const { t } = useTranslation();
  const [openAddAdmin, setOpenAddAdmin] = useState<boolean>(false);

  const statuses = [
    {
      value: "IN_WAREHOUSE",
      label: "IN_WAREHOUSE",
    },
    {
      value: "OUT_OF_WAREHOUSE",
      label: "OUT_OF_WAREHOUSE",
    },
    {
      value: "UNKNOWN",
      label: "UNKNOWN",
    },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <TextInput
          placeholder={t("ID")}
          value={id}
          setValue={setId}
          icon={
            <MagnifyingGlassIcon
              size={25}
              color={getTailwindColor("neutral-500")}
            />
          }
          className="w-full"
        />

        <TextInput
          placeholder={t("NAME")}
          value={name}
          setValue={setName}
          icon={
            <MagnifyingGlassIcon
              size={25}
              color={getTailwindColor("neutral-500")}
            />
          }
          className="w-full"
        />
        
        <Dropdown
          items={statuses}
          selected={status}
          setSelected={(val: any) => setStatus(val)}
          showNoneOption
          className="min-w-48"
        />

        <Button
          onClick={() => setOpenAddAdmin(true)}
          className="h-12 rounded-xl text-lg"
        >
          <PlusIcon color="white" weight="bold" /> {t("ADD_CATEGORY")}
        </Button>
      </div>

      <EditItemDialog
        open={openAddAdmin}
        setOpen={setOpenAddAdmin}
        onAction={onAddUser}
      />
    </>
  );
};

export default Filter;
