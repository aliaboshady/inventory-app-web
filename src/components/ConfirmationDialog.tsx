"use client";

import TextInput from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getTailwindColor } from "@/lib/utils";
import { EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

const ConfirmationDialog = ({ open, setOpen }: Props) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <TextInput
            label={t("USERNAME")}
            placeholder={t("ENTER_USERNAME")}
            value={""}
            setValue={() => {}}
            icon={
              <EnvelopeSimpleIcon
                size={25}
                color={getTailwindColor("primary")}
              />
            }
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
