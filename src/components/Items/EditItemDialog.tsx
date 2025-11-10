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
import { DialogProps, Paginated } from "@/models/shared.model";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { CategoriesPayload, Category } from "@/models/category.model";
import { Item, ItemStatus } from "@/models/item.model";
import Dropdown from "../Dropdown";
import useRequest from "@/hooks/useRequest";
import { getCategories } from "@/actions/categories/getCategories";
import { editItem } from "@/actions/items/editItem";
import { createItem } from "@/actions/items/createItem";

const EditItemDialog = ({
  open,
  setOpen,
  item,
  onAction,
  closeOnAction = true,
}: DialogProps<Item>) => {
  const { t } = useTranslation();

  const [name, setName] = useState(item?.name || "");
  const [status, setStatus] = useState<ItemStatus>(item?.status);
  const [category, setCategory] = useState<string>(item?.category?._id || "");
  const [comment, setComment] = useState<string>(item?.comment || "");
  const [isLoading, setIsLoading] = useState(false);

  const [categoriesPage, setCategoriesPage] = useState<number>(1);
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);

  const { request: fetchCategories, isLoading: isLoadingCategories } =
    useRequest<CategoriesPayload, Paginated<Category>>(getCategories);

  const handleFetchCategories = async () => {
    const newData = await fetchCategories({
      page: categoriesPage,
      itemsPerPage: 20,
    });

    if (newData?.data?.length) {
      const mapped = newData.data.map((c) => ({
        value: c._id,
        label: c.name,
      }));
      setCategories((prev) => [...prev, ...mapped]);
      setCategoriesPage((prev) => prev + 1);
      return mapped;
    }
    return [];
  };

  const statuses = [
    {
      value: "IN_WAREHOUSE",
      label: "IN_WAREHOUSE",
    },
    {
      value: "OUT_OF_WAREHOUSE",
      label: "OUT_OF_WAREHOUSE",
    },
    {
      value: "UNKNOWN",
      label: "UNKNOWN",
    },
  ];

  useEffect(() => {
    const init = async () => {
      setCategories([]);
      setCategoriesPage(1);
      const newCategories = await handleFetchCategories();

      // If editing an item, set the category to match one of the fetched options
      if (item?.category?._id) {
        const found = newCategories?.find((c) => c.value === item.category._id);
        if (found) setCategory(found.value);
        else setCategory(item.category._id); // fallback if not in first page
      }
    };
    init();
  }, [item]);

  const handleSubmit = async () => {
    setIsLoading(true);

    if (item) {
      await editItem({
        _id: item?._id,
        name,
        category,
        comment,
        status,
      });
    } else {
      await createItem({
        name,
        category,
        comment,
        status,
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
            {t(item ? "EDIT_ITEM" : "ADD_ITEM")}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            placeholder={t("ENTER_NAME")}
            value={name}
            setValue={setName}
          />

          <TextInput
            placeholder={t("ENTER_COMMENT")}
            value={comment}
            setValue={setComment}
          />

          <Dropdown
            items={statuses}
            selected={status}
            setSelected={(val: any) => setStatus(val)}
            placeholder="STATUS"
            showNoneOption
          />

          <Dropdown
            items={categories}
            selected={category}
            setSelected={(val: any) => setCategory(val)}
            placeholder="CATEGORY"
            showNoneOption
            disabled={!categories || categories?.length === 0}
            loadingData={isLoadingCategories}
            onReachTheEnd={handleFetchCategories}
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

export default EditItemDialog;
