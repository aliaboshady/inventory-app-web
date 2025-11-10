"use client";

import TextInput from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import { getTailwindColor } from "@/lib/utils";
import { MagnifyingGlassIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import EditItemDialog from "./EditItemDialog";
import { ItemStatus } from "@/models/item.model";
import Dropdown from "../Dropdown";
import useRequest from "@/hooks/useRequest";
import { getCategories } from "@/actions/categories/getCategories";
import { Paginated } from "@/models/shared.model";
import { CategoriesPayload, Category } from "@/models/category.model";

type Props = {
  name: string;
  setName: (val: string) => void;
  id: string;
  setId: (val: string) => void;
  status: ItemStatus;
  setStatus: (val: ItemStatus) => void;
  category: string;
  setCategory: (val: string) => void;
  onAddUser: () => void;
};

const Filter = ({
  name,
  setName,
  id,
  setId,
  status,
  setStatus,
  category,
  setCategory,
  onAddUser,
}: Props) => {
  const { t } = useTranslation();
  const [openAddAdmin, setOpenAddAdmin] = useState<boolean>(false);
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
    }
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
      setCategory("");
      setCategoriesPage(1);
      await handleFetchCategories();
    };
    init();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-42 lg:grid-cols-3 gap-4">
        <TextInput
          placeholder={t("ID")}
          value={id}
          setValue={setId}
          icon={
            <MagnifyingGlassIcon
              size={25}
              color={getTailwindColor("neutral-500")}
            />
          }
        />

        <TextInput
          placeholder={t("NAME")}
          value={name}
          setValue={setName}
          icon={
            <MagnifyingGlassIcon
              size={25}
              color={getTailwindColor("neutral-500")}
            />
          }
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

        <Button variant="outline" className="h-12 text-lg">
          Attributes
        </Button>

        <Button onClick={() => setOpenAddAdmin(true)} className="h-12 text-lg">
          <PlusIcon color="white" weight="bold" /> {t("ADD_ITEM")}
        </Button>
      </div>

      <EditItemDialog
        open={openAddAdmin}
        setOpen={setOpenAddAdmin}
        onAction={onAddUser}
      />
    </>
  );
};

export default Filter;
