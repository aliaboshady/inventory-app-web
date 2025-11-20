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
import { DialogProps, ServerResponse } from "@/models/shared.model";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  Category,
  CreateCategoryPayload,
  EditCategoryPayload,
} from "@/models/category.model";
import { editCategory } from "@/actions/categories/editCategory";
import { createCategory } from "@/actions/categories/createCategory";
import UploadPicture from "../UploadPicture";
import useRequest from "@/hooks/useRequest";

const EditCategoryDialog = ({
  open,
  setOpen,
  item,
  onAction,
  closeOnAction = true,
}: DialogProps<Category>) => {
  const { t } = useTranslation();

  const [name, setName] = useState(item?.name || "");
  const [picture, setPicture] = useState<File>();

  const { request: createCategoryReq, isLoading: isLoadingCreatingCategory } =
    useRequest<CreateCategoryPayload, ServerResponse<Category>>(
      createCategory,
      {
        showSuccessToast: true,
        successToastMessage: "CATEGORY_CREATE_SUCCESSFUL",
      }
    );

  const { request: editCategoryReq, isLoading: isLoadingEditingCategory } =
    useRequest<EditCategoryPayload, ServerResponse<Category>>(editCategory, {
      showSuccessToast: true,
      successToastMessage: "CATEGORY_EDIT_SUCCESSFUL",
    });

  const handleSubmit = async () => {
    if (item) {
      await editCategoryReq({
        _id: item?._id,
        name,
      });
    } else {
      await createCategoryReq({
        name,
      });
    }

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

        {item && (
          <UploadPicture
            id={item?._id}
            imageURL={item?.imageURL}
            picture={picture}
            setPicture={setPicture}
            type="category"
            onUpload={() => onAction?.(item)}
          />
        )}

        <TextInput
          label={t("NAME")}
          placeholder={t("ENTER_NAME")}
          value={name}
          setValue={setName}
          className="w-full"
        />

        <DialogFooter className="flex flex-row justify-end gap-2">
          <DialogClose
            disabled={isLoadingCreatingCategory || isLoadingEditingCategory}
            asChild
          >
            <Button variant="secondary">{t("CANCEL")}</Button>
          </DialogClose>

          <Button
            disabled={isLoadingCreatingCategory || isLoadingEditingCategory}
            onClick={handleSubmit}
            type="submit"
          >
            {t(item ? "EDIT" : "ADD")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryDialog;
