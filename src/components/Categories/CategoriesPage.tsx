"use client";

import { useEffect } from "react";
import useRequest from "@/hooks/useRequest";
import Filter from "@/components/Categories/Filter";
import Table from "@/components/Categories/Table";
import PageLayout from "@/components/PageLayout";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Paginated } from "@/models/shared.model";
import { getCategories } from "@/actions/categories/getCategories";
import { CategoriesPayload, Category } from "@/models/category.model";

const CategoriesPage = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [name, setName] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(name);

  const { request: fetch, data } = useRequest<
    CategoriesPayload,
    Paginated<Category>
  >(getCategories);

  useEffect(() => {
    fetch({ page, itemsPerPage, name: debouncedSearch });
  }, [page, itemsPerPage, debouncedSearch]);

  useDebounce(
    () => {
      if (name !== debouncedSearch) {
        setPage(1);
      }
      setDebouncedSearch(name);
    },
    500,
    [name]
  );

  return (
    <PageLayout title="CATEGORIES">
      <Filter
        name={name}
        setName={setName}
        onAddUser={() => fetch({ page, itemsPerPage, name })}
      />
      <Table
        data={data}
        fetch={fetch}
        page={page}
        setPage={setPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        name={debouncedSearch}
      />
    </PageLayout>
  );
};

export default CategoriesPage;
