"use client";

import Filter from "@/components/users/Users/Filter";
import Table from "@/components/users/Users/Table";
import PageLayout from "@/components/PageLayout";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

const Layout = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [role, setRole] = useState<string>();
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);

  useDebounce(() => {
    if (search !== debouncedSearch) {
      setPage(1);
    }
    setDebouncedSearch(search);
  }, 500);

  return (
    <PageLayout title="USERS">
      <Filter
        role={role}
        setRole={setRole}
        search={search}
        setSearch={setSearch}
      />
      <Table
        page={page}
        setPage={setPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        role={role}
        search={debouncedSearch}
      />
    </PageLayout>
  );
};

export default Layout;
