"use client";

import TextInput from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import { getTailwindColor } from "@/lib/utils";
import { MagnifyingGlassIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import EditItemDialog from "./EditItemDialog";
import { ItemStatus } from "@/models/item.model";
import Dropdown, { DropdownItem } from "../Dropdown";

type Props = {
  name: string;
  setName: (val: string) => void;
  id: string;
  setId: (val: string) => void;
  status: ItemStatus;
  setStatus: (val: ItemStatus) => void;
  category: string;
  setCategory: (val: string) => void;
  onAddUser: () => void;
  colors: DropdownItem[];
  categories: DropdownItem[];
  color: string;
  setColor: (val: string) => void;
};

const Filter = ({
  name,
  setName,
  id,
  setId,
  status,
  setStatus,
  category,
  setCategory,
  onAddUser,
  colors,
  categories,
  color,
  setColor,
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
      <div className="grid grid-cols-1 sm:grid-cols-42 lg:grid-cols-3 gap-4">
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
        />

        <Dropdown
          items={statuses}
          selected={status}
          setSelected={(val: any) => setStatus(val)}
          placeholder="STATUS"
          showNoneOption
        />

        <Dropdown
          items={categories}
          selected={category}
          setSelected={(val: any) => setCategory(val)}
          placeholder="SELECT_CATEGORY"
          showNoneOption
          disabled={!categories || categories?.length === 0}
        />

        <Dropdown
          items={colors}
          selected={color}
          setSelected={(val: any) => setColor(val)}
          placeholder="SELECT_COLOR"
          showNoneOption
          disabled={!colors || colors?.length === 0}
        />

        <Button onClick={() => setOpenAddAdmin(true)} className="h-12 text-lg">
          <PlusIcon color="white" weight="bold" /> {t("ADD_ITEM")}
        </Button>
      </div>

      <EditItemDialog
        open={openAddAdmin}
        setOpen={setOpenAddAdmin}
        onAction={onAddUser}
        colors={colors}
        categories={categories}
      />
    </>
  );
};

export default Filter;
