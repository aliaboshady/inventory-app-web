"use client";

import TextInput from "@/components/TextInput";
import Dropdown from "@/components/Dropdown";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogProps } from "@/models/shared.model";
import { User } from "@/models/user.model";
import { useTranslation } from "react-i18next";
import { Label } from "../../ui/label";
import { useState } from "react";

const EditAdminDialog = ({ open, setOpen, item }: DialogProps<User>) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState([]);

  const roles = [
    { value: "ADMIN", label: "ADMIN" },
    { value: "SUPER_ADMIN", label: "SUPER_ADMIN" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px] w-[calc(100%-2rem)] rounded-lg">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl">{t("EDIT_ADMIN")}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5">
          <TextInput
            label={t("USERNAME")}
            placeholder={t("ENTER_USERNAME")}
            value={""}
            setValue={() => {}}
            className="w-full"
          />

          <TextInput
            label={t("PASSWORD")}
            placeholder={t("ENTER_PASSWORD")}
            value={""}
            setValue={() => {}}
            className="w-full"
            isPassword
          />

          <div className="flex flex-col gap-2">
            <Label>{t("ROLE")}</Label>
            <Dropdown
              items={roles}
              selected={selected}
              placeholder={t("ROLE")}
              setSelected={setSelected}
            />
          </div>
        </div>

        <DialogFooter className="flex flex-row justify-end gap-2">
          <DialogClose asChild>
            <Button variant="secondary">{t("CANCEL")}</Button>
          </DialogClose>

          <Button type="submit">{t("ADD")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAdminDialog;
