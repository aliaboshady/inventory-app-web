"use client";

import TextInput from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import { getTailwindColor } from "@/lib/utils";
import { MagnifyingGlassIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import EditColorDialog from "./EditColorDialog";

type Props = {
  name: string;
  setName: (val: string) => void;
  onAddUser: () => void;
};

const Filter = ({ name, setName, onAddUser }: Props) => {
  const { t } = useTranslation();
  const [openAddAdmin, setOpenAddAdmin] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <TextInput
          placeholder={t("NAME")}
          value={name || ""}
          setValue={setName}
          icon={
            <MagnifyingGlassIcon
              size={25}
              color={getTailwindColor("neutral-500")}
            />
          }
          className="rounded-xl w-full"
          inputClassName="h-12"
        />

        <Button
          onClick={() => setOpenAddAdmin(true)}
          className="h-12 rounded-xl text-lg"
        >
          <PlusIcon color="white" weight="bold" /> {t("ADD_COLOR")}
        </Button>
      </div>

      <EditColorDialog
        open={openAddAdmin}
        setOpen={setOpenAddAdmin}
        onAction={onAddUser}
      />
    </>
  );
};

export default Filter;
