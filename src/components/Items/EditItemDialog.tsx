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
import {
  CreateItemPayload,
  EditItemPayload,
  Item,
  ItemStatus,
} from "@/models/item.model";
import Dropdown, { DropdownItem } from "../Dropdown";
import useRequest from "@/hooks/useRequest";
import { getCategories } from "@/actions/categories/getCategories";
import { editItem } from "@/actions/items/editItem";
import { createItem } from "@/actions/items/createItem";
import { Label } from "../ui/label";
import UploadPicture from "../UploadPicture";
import { getColors } from "@/actions/colors/getColors";
import { Color, ColorsPayload } from "@/models/color.model";

const EditItemDialog = ({
  open,
  setOpen,
  item,
  onAction,
  closeOnAction = true,
}: DialogProps<Item>) => {
  const { t } = useTranslation();

  const [name, setName] = useState(item?.name || "");
  const [status, setStatus] = useState<ItemStatus>(item?.status || "UNKNOWN");
  const [category, setCategory] = useState<string>(item?.category?._id || "");
  const [color, setColor] = useState<string>(item?.color?._id || "");
  const [width, setWidth] = useState<number>(item?.width || 0);
  const [length, setLength] = useState<number>(item?.length || 0);
  const [height, setHeight] = useState<number>(item?.height || 0);
  const [comment, setComment] = useState<string>(item?.comment || "");
  const [picture, setPicture] = useState<File>();
  const [categoriesPage, setCategoriesPage] = useState<number>(1);
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);
  const [colors, setColors] = useState<DropdownItem[]>([]);

  const { request: createItemReq, isLoading: isLoadingCreatingItem } =
    useRequest<CreateItemPayload, Item>(createItem);

  const { request: editItemReq, isLoading: isLoadingEditingItem } = useRequest<
    EditItemPayload,
    Item
  >(editItem);

  const { request: fetchCategories, isLoading: isLoadingCategories } =
    useRequest<CategoriesPayload, Paginated<Category>>(getCategories);

  const { request: fetchColors, isLoading: isLoadingColors } = useRequest<
    ColorsPayload,
    Color[]
  >(getColors);

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

  const handleFetchColors = async () => {
    const newData = await fetchColors({});

    if (newData?.length) {
      const mapped = newData.map((c) => ({
        value: c._id,
        labelNode: (
          <div className="flex flex-row items-center gap-4">
            <div className="w-8 h-4" style={{ backgroundColor: c?.color }} />
            <p className="truncate">{c?.name}</p>
          </div>
        ),
      }));
      setColors(mapped as DropdownItem[]);
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
    const initCategories = async () => {
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

    const initColors = async () => {
      setColors([]);
      const newColors = await handleFetchColors();

      if (item?.color?._id) {
        const found = newColors?.find((c) => c.value === item.color._id);
        if (found) setColor(found.value);
        else setColor(item.color._id); // fallback if not in first page
      }
    };
    initCategories();
    initColors();
  }, [item]);

  const handleSubmit = async () => {
    if (item) {
      await editItemReq({
        _id: item?._id,
        name,
        category,
        comment,
        status,
        color,
        width,
        length,
        height,
      });
    } else {
      await createItemReq({
        name,
        category,
        comment,
        status,
        color,
        width,
        length,
        height,
      });
    }

    await onAction?.(item);
    if (closeOnAction) setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px] w-[calc(100%-2rem)] max-h-[calc(100%-2rem)] rounded-lg overflow-auto">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl">
            {t(item ? "EDIT_ITEM" : "ADD_ITEM")}
          </DialogTitle>
        </DialogHeader>

        {item && (
          <UploadPicture
            id={item?._id}
            imageURL={item?.imageURL}
            picture={picture}
            setPicture={setPicture}
            type="item"
            onUpload={() => onAction?.(item)}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label={t("NAME")}
            placeholder={t("ENTER_NAME")}
            value={name}
            setValue={setName}
          />

          <TextInput
            label={t("COMMENT")}
            placeholder={t("ENTER_COMMENT")}
            value={comment}
            setValue={setComment}
          />

          <div className="flex flex-col gap-2">
            <Label>{t("STATUS")}</Label>
            <Dropdown
              items={statuses}
              selected={status}
              setSelected={(val: any) => setStatus(val)}
              placeholder="STATUS"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>{t("CATEGORY")}</Label>
            <Dropdown
              items={categories}
              selected={category}
              setSelected={(val: any) => setCategory(val)}
              placeholder="SELECT_CATEGORY"
              disabled={!categories || categories?.length === 0}
              loadingData={isLoadingCategories}
              onReachTheEnd={handleFetchCategories}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>{t("COLOR")}</Label>
            <Dropdown
              items={colors}
              selected={color}
              setSelected={(val: any) => setColor(val)}
              placeholder="SELECT_COLOR"
              showNoneOption
              disabled={!colors || colors?.length === 0}
              loadingData={isLoadingColors}
            />
          </div>

          <div className="flex flex-row gap-2">
            <div className="flex flex-col gap-2">
              <Label>{t("WIDTH")}</Label>
              <div dir="ltr">
                <TextInput
                  placeholder={t("ENTER_WIDTH")}
                  value={width as any}
                  setValue={setWidth as any}
                  type="number"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label>{t("LENGTH")}</Label>
              <div dir="ltr">
                <TextInput
                  placeholder={t("ENTER_LENGTH")}
                  value={length as any}
                  setValue={setLength as any}
                  type="number"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label>{t("HEIGHT")}</Label>
              <div dir="ltr">
                <TextInput
                  placeholder={t("ENTER_HEIGHT")}
                  value={height as any}
                  setValue={setHeight as any}
                  type="number"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-row justify-end gap-2">
          <DialogClose
            disabled={isLoadingEditingItem || isLoadingCreatingItem}
            asChild
          >
            <Button variant="secondary">{t("CANCEL")}</Button>
          </DialogClose>

          <Button
            disabled={isLoadingEditingItem || isLoadingCreatingItem}
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

export default EditItemDialog;
