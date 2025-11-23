"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Paginated, ServerResponse } from "@/models/shared.model";
import { getItems } from "@/actions/items/getItems";
import { ItemsPayload, Item, ItemStatus } from "@/models/item.model";
import { Color } from "@/models/color.model";
import { DropdownItem } from "../Dropdown";
import { Category } from "@/models/category.model";
import useRequest from "@/hooks/useRequest";
import Filter from "@/components/Items/Filter";
import Table from "@/components/Items/Table";
import PageLayout from "@/components/PageLayout";
import Avatar from "../Avatar";

const ItemsPage = ({
  colors,
  categories,
}: {
  colors: Color[];
  categories: Category[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryId = searchParams.get("id");

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [id, setId] = useState<string>(queryId || "");
  const [debouncedId, setDebouncedId] = useState<string>(id);
  const [status, setStatus] = useState<ItemStatus>();
  const [name, setName] = useState<string>("");
  const [debouncedName, setDebouncedName] = useState<string>(name);
  const [category, setCategory] = useState<string>();
  const [color, setColor] = useState<string>();

  const mappedColors: DropdownItem[] =
    colors?.map((c) => ({
      value: c._id,
      label: c.name,
      labelNode: (
        <div className="flex flex-row items-center gap-4">
          <div className="w-8 h-4" style={{ backgroundColor: c.color }} />
          <p className="truncate">{c.name}</p>
        </div>
      ),
    })) || [];

  const mappedCategories: DropdownItem[] =
    categories?.map((c) => ({
      value: c._id,
      label: c.name,
      labelNode: <Avatar label={c?.name} src={c?.imageURL} type="category" />,
    })) || [];

  const { request: fetch, data } = useRequest<
    ItemsPayload,
    ServerResponse<Paginated<Item>>
  >(getItems);

  useEffect(() => {
    fetch({
      page,
      itemsPerPage,
      _id: debouncedId,
      status,
      name: debouncedName,
      category,
      color,
    });
  }, [page, itemsPerPage, debouncedId, status, debouncedName, category, color]);

  useEffect(() => {
    if (!queryId) return;

    const params = new URLSearchParams(window.location.search);
    params.delete("id");
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [queryId, router]);

  useDebounce(
    () => {
      if (name !== debouncedName) {
        setPage(1);
      }
      setDebouncedName(name);
    },
    500,
    [name]
  );

  useDebounce(
    () => {
      if (id !== debouncedId) {
        setPage(1);
      }
      setDebouncedId(id);
    },
    500,
    [debouncedId]
  );

  return (
    <PageLayout title="ITEMS">
      <Filter
        name={name}
        setName={setName}
        id={id}
        setId={setId}
        status={status}
        setStatus={setStatus}
        category={category}
        setCategory={setCategory}
        onAddUser={() => fetch({ page, itemsPerPage, name })}
        colors={mappedColors}
        color={color}
        setColor={setColor}
        categories={mappedCategories}
      />
      <div className="h-[calc(100vh-10rem)] md:h-[calc(100vh-19rem)]">
        <Table
          data={data?.data}
          fetch={fetch}
          page={page}
          setPage={setPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          name={debouncedName}
          id={debouncedId}
          colors={mappedColors}
          categories={mappedCategories}
        />
      </div>
    </PageLayout>
  );
};

export default ItemsPage;
