"use client";

import { useEffect } from "react";
import useRequest from "@/hooks/useRequest";
import { getUsers } from "@/actions/users/getUsers";

import Filter from "@/components/users/Users/Filter";
import Table from "@/components/users/Users/Table";
import PageLayout from "@/components/PageLayout";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { User, UserRole, UsersPayload } from "@/models/user.model";
import { Paginated } from "@/models/shared.model";

const Layout = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [role, setRole] = useState<string>();
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);

  const { request: fetch, data } = useRequest<UsersPayload, Paginated<User>>(
    getUsers
  );

  useEffect(() => {
    fetch({ page, itemsPerPage, role: role as UserRole, search });
  }, [page, itemsPerPage, role, search]);

  useEffect(() => {
    console.log("🚀 ~ Table ~ data:", data);
  }, [data]);

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
        onAddUser={() =>
          fetch({ page, itemsPerPage, role: role as UserRole, search })
        }
      />
      <Table
        data={data}
        fetch={fetch}
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
