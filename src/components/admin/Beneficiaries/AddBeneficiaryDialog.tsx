"use client";

import FileDropzone from "@/components/FileDropzone";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DialogProps } from "@/models/shared.model";
import { User } from "@/models/user.model";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const AddBeneficiaryDialog = ({ open, setOpen, item }: DialogProps<User>) => {
  const { t } = useTranslation();
  const [type, setType] = useState("individual");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px] w-[calc(100%-2rem)] rounded-lg">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl">{t("ADD_BENEFICIARY")}</DialogTitle>

          <RadioGroup
            defaultValue="individual"
            value={type}
            onValueChange={setType}
            className="flex flex-row gap-6 !mt-3"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="individual" id="r1" />
              <Label htmlFor="r1">{t("INDIVIDUAL")}</Label>
            </div>

            <div className="flex items-center gap-3">
              <RadioGroupItem value="group" id="r2" />
              <Label htmlFor="r2">{t("GROUP")}</Label>
            </div>
          </RadioGroup>
        </DialogHeader>

        {type === "individual" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5">
            <TextInput
              label={`${t("USERNAME")} / ${t("CASE_MANAGEMENT_NUMBER")}`}
              placeholder={`${t("ENTER_USERNAME")} / ${t("CASE_MANAGEMENT_NUMBER")}`}
              value={""}
              setValue={() => {}}
              className="w-full"
            />

            <TextInput
              label={t("BENEFICIARY_NAME")}
              placeholder={t("ENTER_BENEFICIARY_NAME")}
              value={""}
              setValue={() => {}}
              className="w-full"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4 py-5">
            <div className="border p-3 rounded-lg flex flex-row justify-between items-center">
              <div className="flex flex-row items-center gap-1">
                <Image alt="" src="/images/excel.png" width={25} height={35} />
                <p className="text-[12px] font-medium">{t("ACCOUNTS_TEMPLATE")}</p>
              </div>

              <Button variant="secondary">{t("DOWNLOAD")}</Button>
            </div>

            <FileDropzone />
          </div>
        )}

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

export default AddBeneficiaryDialog;
