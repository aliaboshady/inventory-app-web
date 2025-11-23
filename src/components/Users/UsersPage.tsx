"use client";

import { useEffect } from "react";
import { getUsers } from "@/actions/users/getUsers";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { User, UserRole, UsersPayload } from "@/models/user.model";
import { Paginated, ServerResponse } from "@/models/shared.model";
import useRequest from "@/hooks/useRequest";
import Filter from "@/components/Users/Filter";
import Table from "@/components/Users/Table";
import PageLayout from "@/components/PageLayout";

const UsersPage = ({ me }: { me: User }) => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [role, setRole] = useState<string>();
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);

  const { request: fetch, data } = useRequest<
    UsersPayload,
    ServerResponse<Paginated<User>>
  >(getUsers);

  useEffect(() => {
    fetch({
      page,
      itemsPerPage,
      role: role as UserRole,
      search: debouncedSearch,
    });
  }, [page, itemsPerPage, role, debouncedSearch]);

  useDebounce(
    () => {
      if (search !== debouncedSearch) {
        setPage(1);
      }
      setDebouncedSearch(search);
    },
    500,
    [search]
  );

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
        me={me}
      />
      <div className="h-[calc(100vh-15rem)]">
        <Table
          data={data?.data}
          fetch={fetch}
          page={page}
          setPage={setPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          role={role}
          search={debouncedSearch}
          me={me}
        />
      </div>
    </PageLayout>
  );
};

export default UsersPage;
