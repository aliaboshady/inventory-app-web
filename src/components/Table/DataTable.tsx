"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import {
  DialogSettings,
  Paginated,
  SortType,
} from "@/models/shared.model";
import { twMerge } from "tailwind-merge";
import Pagination from "./Pagination";
import TableSettings from "./TableSettings";

export type Column = {
  header: (item: any) => React.ReactNode;
  value: (item: any) => React.ReactNode;
  sortKey?: string;
  headerClassName?: string;
  cellClassName?: string;
};

type Props = {
  items: any[];
  columns: Column[];
  selection?: boolean;
  sort?: (newSortBy: string) => void;
  sortBy?: string;
  sortType?: SortType;
  page?: number;
  setPage?: (val: number) => void;
  itemsPerPage?: number;
  setItemsPerPage?: (val: number) => void;
  dataPagination?: Paginated<any>;
  settings: DialogSettings[];
};

const DataTable = ({
  items,
  columns,
  selection,
  sort,
  sortBy,
  sortType,
  page,
  setPage,
  itemsPerPage,
  setItemsPerPage,
  dataPagination,
  settings,
}: Props) => {
  const [selectedAll, setSelectedAll] = useState<"indeterminate" | boolean>(
    false
  );
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelectAllRows = (checked: boolean) => {
    if (checked) {
      const allIds = items.map((item) => item._id);
      setSelected(allIds);
      setSelectedAll(true);
    } else {
      setSelected([]);
      setSelectedAll(false);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelected((currentSelected) => {
      const newSelected = checked
        ? [...currentSelected, id]
        : currentSelected.filter((item) => item !== id);

      if (newSelected.length === items.length) {
        setSelectedAll(true);
      } else if (newSelected.length === 0) {
        setSelectedAll(false);
      } else {
        setSelectedAll("indeterminate");
      }

      return newSelected;
    });
  };

  return (
    <div className="h-full flex flex-col justify-between border border-neutral-200 rounded-xl overflow-hidden">
      <Table>
        <TableHeader className="bg-neutral-100 h-12 sticky top-0 z-10">
          <TableRow>
            {selection && (
              <TableHead className="w-10 h-10 text-center">
                <Checkbox
                  checked={selectedAll}
                  onCheckedChange={handleSelectAllRows}
                />
              </TableHead>
            )}
            {columns.map((column, i) => (
              <TableHead
                key={i}
                className={twMerge(
                  `w-24 text-black text-nowrap ps-5 ${
                    sortBy === column.sortKey ? "font-semibold" : "font-medium"
                  }`,
                  column.headerClassName
                )}
              >
                <button
                  disabled={!column.sortKey}
                  onClick={() => sort?.(column.sortKey)}
                  className="w-full h-full flex items-center gap-2"
                >
                  {column.header(column)}

                  {sortBy && sortBy === column.sortKey && (
                    <CaretDownIcon
                      className={`w-4 h-4 fill-black ${
                        sortType === "DESC" ? "rotate-0" : "rotate-180"
                      }`}
                    />
                  )}
                </button>
              </TableHead>
            ))}

            {settings && <TableHead className="w-20 text-black text-nowrap" />}
          </TableRow>
        </TableHeader>

        <TableBody>
          {items &&
            items.map((item) => (
              <TableRow key={item._id}>
                {selection && (
                  <TableCell className="w-10 h-10 text-center">
                    <Checkbox
                      id={item._id}
                      checked={selected.includes(item._id)}
                      onCheckedChange={(checked) =>
                        handleSelectRow(item._id, checked as boolean)
                      }
                    />
                  </TableCell>
                )}

                {columns.map((column, i) => (
                  <TableCell
                    key={i}
                    className={twMerge(
                      "text-nowrap font-medium ps-5",
                      column.cellClassName
                    )}
                  >
                    {column.value(item)}
                  </TableCell>
                ))}

                {settings && (
                  <TableCell>
                    <TableSettings settings={settings} item={item} />
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <div className="w-full p-4 flex justify-center sm:justify-end items-center">
        {selection && <div className="text-sm">Selected {selected.length}</div>}

        <Pagination
          currentPage={page}
          setPage={setPage}
          dataPagination={dataPagination}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      </div>
    </div>
  );
};

export default DataTable;
