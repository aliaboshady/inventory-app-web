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

const AssignToDialog = ({ open, setOpen, item }: DialogProps<User>) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[400px] w-[calc(100%-2rem)] rounded-lg">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl">Assign to</DialogTitle>
        </DialogHeader>

        <TextInput
          label={t("EMAIL")}
          placeholder={t("Enter email")}
          value={""}
          setValue={() => {}}
          className="w-full"
        />

        <DialogFooter className="flex flex-row justify-end gap-2">
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>

          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignToDialog;
