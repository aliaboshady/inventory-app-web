"use client";

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
import { DialogProps } from "@/models/shared.model";
import { User } from "@/models/user.model";
import { useTranslation } from "react-i18next";

const EditBeneficiaryDialog = ({ open, setOpen, item }: DialogProps<User>) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px] w-[calc(100%-2rem)] rounded-lg">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl">{t("EDIT_BENEFICIARY")}</DialogTitle>
        </DialogHeader>

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

export default EditBeneficiaryDialog;
