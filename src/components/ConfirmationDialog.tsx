"use client";

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
import { useTranslation } from "react-i18next";

const ConfirmationDialog = ({ open, setOpen, item, onAction }: DialogProps<any>) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] w-[calc(100%-2rem)] rounded-lg gap-10">
        <DialogHeader className="text-left">
          <DialogTitle>{t("ARE_YOU_SURE")}</DialogTitle>
        </DialogHeader>

        <DialogFooter className="flex flex-row justify-center gap-2">
          <DialogClose asChild>
            <Button variant="secondary" className="w-full">
              {t("CANCEL")}
            </Button>
          </DialogClose>

          <Button
            onClick={() => {
              onAction?.(item);
            }}
            className="w-full"
          >
            {t("SUBMIT")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
