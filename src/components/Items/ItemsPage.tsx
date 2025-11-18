"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useRequest from "@/hooks/useRequest";
import Filter from "@/components/Items/Filter";
import Table from "@/components/Items/Table";
import PageLayout from "@/components/PageLayout";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Paginated } from "@/models/shared.model";
import { getItems } from "@/actions/items/getItems";
import { ItemsPayload, Item, ItemStatus } from "@/models/item.model";
import { Color } from "@/models/color.model";

const ItemsPage = ({ colors }: { colors: Color[] }) => {
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

  const { request: fetch, data } = useRequest<ItemsPayload, Paginated<Item>>(
    getItems
  );

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
        colors={colors}
        color={color}
        setColor={setColor}
      />
      <div className="h-[calc(100vh-19rem)]">
        <Table
          data={data}
          fetch={fetch}
          page={page}
          setPage={setPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          name={debouncedName}
          id={debouncedId}
        />
      </div>
    </PageLayout>
  );
};

export default ItemsPage;
