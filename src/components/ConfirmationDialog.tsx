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
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ConfirmationDialog = ({
  open,
  setOpen,
  item,
  onAction,
  closeOnAction = true,
}: DialogProps<any>) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] w-[calc(100%-2rem)] rounded-lg gap-10">
        <DialogHeader className="text-left">
          <DialogTitle>{t("ARE_YOU_SURE")}</DialogTitle>
        </DialogHeader>

        <DialogFooter className="flex flex-row justify-center gap-2">
          <DialogClose asChild>
            <Button disabled={isLoading} variant="secondary" className="w-full">
              {t("CANCEL")}
            </Button>
          </DialogClose>

          <Button
            disabled={isLoading}
            onClick={async () => {
              setIsLoading(true);
              await onAction?.(item);
              setIsLoading(false);
              if (closeOnAction) {
                setOpen(false);
              }
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
