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
import { DialogProps } from "@/model/shared.models";
import { User } from "@/model/user.models";
import { useTranslation } from "react-i18next";

const EditBeneficiaryDialog = ({ open, setOpen, item }: DialogProps<User>) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px] w-[calc(100%-2rem)] rounded-lg">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl">Edit admin</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5">
          <TextInput
            label={t("Username / case management number")}
            placeholder={t("Enter Username / case management number")}
            value={""}
            setValue={() => {}}
            className="w-full"
          />

          <TextInput
            label={t("Beneficiary Name")}
            placeholder={t("Enter Beneficiary Name")}
            value={""}
            setValue={() => {}}
            className="w-full"
          />
        </div>

        <DialogFooter className="flex flex-row justify-end gap-2">
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>

          <Button type="submit">Edit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBeneficiaryDialog;
