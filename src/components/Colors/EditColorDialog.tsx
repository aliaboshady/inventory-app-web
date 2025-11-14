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
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Color } from "@/models/color.model";
import { editColor } from "@/actions/colors/editColor";
import { createColor } from "@/actions/colors/createColor";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const EditColorDialog = ({
  open,
  setOpen,
  item,
  onAction,
  closeOnAction = true,
}: DialogProps<Color>) => {
  const { t } = useTranslation();

  const [name, setName] = useState(item?.name || "");
  const [color, setColor] = useState(item?.color || "#000000");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    if (item) {
      await editColor({
        _id: item?._id,
        name,
        color,
      });
    } else {
      await createColor({
        name,
        color,
      });
    }

    setIsLoading(false);
    await onAction?.(item);
    if (closeOnAction) setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px] w-[calc(100%-2rem)] rounded-lg">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl">
            {t(item ? "EDIT_COLOR" : "ADD_COLOR")}
          </DialogTitle>
        </DialogHeader>

        <TextInput
          label={t("NAME")}
          placeholder={t("ENTER_NAME")}
          value={name}
          setValue={setName}
          className="w-full"
        />

        <div className="w-full flex flex-col gap-2">
          <Label>{t("COLOR")}</Label>
          <Input
            type="color"
            className="w-20 p-0 border-none"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <DialogFooter className="flex flex-row justify-end gap-2">
          <DialogClose disabled={isLoading} asChild>
            <Button variant="secondary">{t("CANCEL")}</Button>
          </DialogClose>

          <Button disabled={isLoading} onClick={handleSubmit} type="submit">
            {t(item ? "EDIT" : "ADD")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditColorDialog;
