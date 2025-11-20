"use client";

import { useEffect } from "react";
import useRequest from "@/hooks/useRequest";
import Filter from "@/components/Colors/Filter";
import Table from "@/components/Colors/Table";
import PageLayout from "@/components/PageLayout";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { getColors } from "@/actions/colors/getColors";
import { Color, ColorsPayload } from "@/models/color.model";
import { ServerResponse } from "@/models/shared.model";

const ColorsPage = () => {
  const [name, setName] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(name);

  const { request: fetch, data } = useRequest<
    ColorsPayload,
    ServerResponse<Color[]>
  >(getColors);

  useEffect(() => {
    fetch({ search: debouncedSearch });
  }, [debouncedSearch]);

  useDebounce(
    () => {
      setDebouncedSearch(name);
    },
    500,
    [name]
  );

  return (
    <PageLayout title="COLORS">
      <Filter
        name={name}
        setName={setName}
        onAddUser={() => fetch({ search: debouncedSearch })}
      />
      <div className="h-[calc(100vh-15rem)]">
        <Table data={data?.data} fetch={fetch} name={debouncedSearch} />
      </div>
    </PageLayout>
  );
};

export default ColorsPage;
