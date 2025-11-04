"use client";

import { DatePicker } from "@/components/DatePicker";
import Dropdown from "@/components/Dropdown";
import TextInput from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DialogProps } from "@/models/shared.model";
import { User } from "@/models/user.model";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const AddProjectDialog = ({ open, setOpen, item }: DialogProps<User>) => {
  const { t } = useTranslation();
  const [date, setDate] = useState<Date>();

  const sessionTypes = [
    { value: "1", label: "Type 1" },
    { value: "2", label: "Type 2" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px] w-[calc(100%-2rem)] rounded-lg">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl">{t("ADD_PROJECT")}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5">
          <TextInput
            label={t("PROJECT_NAME")}
            placeholder={t("ENTER_PROJECT_NAME")}
            value={""}
            setValue={() => {}}
            className="w-full"
          />

          <div className="flex flex-col gap-2">
            <Label>{t("SESSION_TYPE")}</Label>
            <Dropdown items={sessionTypes} selected="" setSelected={() => {}} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>{t("DATE")}</Label>
            <DatePicker
              date={date}
              setDate={setDate}
              className="w-full"
            />
          </div>
        </div>

        <DialogFooter className="flex flex-row justify-end gap-2">
          <DialogClose asChild>
            <Button variant="secondary">{t("CANCEL")}</Button>
          </DialogClose>

          <Button type="submit">{t("EDIT")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectDialog;
