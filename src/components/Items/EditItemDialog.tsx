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
import { Category } from "@/models/category.model";
import { editCategory } from "@/actions/categories/editCategory";
import { createCategory } from "@/actions/categories/createCategory";

const EditItemDialog = ({
  open,
  setOpen,
  item,
  onAction,
  closeOnAction = true,
}: DialogProps<Category>) => {
  const { t } = useTranslation();

  const [name, setName] = useState(item?.name || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    if (item) {
      await editCategory({
        _id: item?._id,
        name,
      });
    } else {
      await createCategory({
        name,
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
            {t(item ? "EDIT_CATEGORY" : "ADD_CATEGORY")}
          </DialogTitle>
        </DialogHeader>

        <TextInput
          label={t("NAME")}
          placeholder={t("ENTER_NAME")}
          value={name}
          setValue={setName}
          className="w-full"
        />

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

export default EditItemDialog;
