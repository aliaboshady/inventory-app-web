"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { User } from "@/model/user.models";
import {
  DotsThreeVerticalIcon,
  PencilSimpleLineIcon,
  TrashIcon,
} from "@phosphor-icons/react/dist/ssr";
import EditUserDialog from "./EditUserDialog";
import ConfirmationDialog from "@/components/ConfirmationDialog";

export default function TableSettings({
  user,
  onUpdate,
}: {
  user: User;
  onUpdate?: () => void;
}) {
  const { t } = useTranslation();
  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="text-neutral-4 font-medium bg-transparent hover:bg-transparent focus:outline-none focus-visible:outline-none"
          >
            <DotsThreeVerticalIcon weight="bold" className="!w-5 !h-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuRadioGroup>
            <DropdownMenuItem
              className="rtl:justify-end"
              onClick={() => setOpenEdit(true)}
            >
              <PencilSimpleLineIcon className="fill-neutral-600" size={18} />
              <p>{t("EDIT")}</p>
            </DropdownMenuItem>

            <DropdownMenuItem className="rtl:justify-end" onClick={() => setOpenConfirm(true)}>
              <TrashIcon className="fill-red-600" size={18} />
              <p>{t("DELETE")}</p>
            </DropdownMenuItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditUserDialog open={openEdit} setOpen={setOpenEdit} />
      <ConfirmationDialog open={openConfirm} setOpen={setOpenConfirm} />
    </>
  );
}
