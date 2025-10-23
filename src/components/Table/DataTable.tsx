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
import {
  CaretDownIcon,
  PencilSimpleLineIcon,
  TrashIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { PaginatedResponse, SortType } from "@/model/shared.models";
import Pagination from "./Pagination";
import { twMerge } from "tailwind-merge";

export type Column = {
  header: string;
  value: (item: any) => React.ReactNode;
  sortKey?: string;
  headerClassName?: string;
  cellClassName?: string;
};

type Props = {
  items: any[];
  columns: Column[];
  selection?: boolean;
  actions?: React.ReactNode;
  sort?: (newSortBy: string) => void;
  sortBy?: string;
  sortType?: SortType;
  page?: number;
  setPage?: (val: number) => void;
  itemsPerPage?: number;
  setItemsPerPage?: (val: number) => void;
  dataPagination?: PaginatedResponse<any>;
};

const DataTable = ({
  items,
  columns,
  selection,
  actions,
  sort,
  sortBy,
  sortType,
  page,
  setPage,
  itemsPerPage,
  setItemsPerPage,
  dataPagination,
}: Props) => {
  const [selectedAll, setSelectedAll] = useState<"indeterminate" | boolean>(
    false
  );
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelectAllRows = (checked: boolean) => {
    if (checked) {
      const allIds = items.map((item) => item.id);
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
    <div className="h-full flex flex-col border border-neutral-200 rounded-xl overflow-hidden">
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
                  className="flex items-center gap-2"
                >
                  {column.header}

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
            <TableHead className="w-20 text-black text-nowrap">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items &&
            items.map((item) => (
              <TableRow key={item.id}>
                {selection && (
                  <TableCell className="w-10 h-10 text-center">
                    <Checkbox
                      id={item.id}
                      checked={selected.includes(item.id)}
                      onCheckedChange={(checked) =>
                        handleSelectRow(item.id, checked as boolean)
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

                <TableCell>
                  <div className="flex gap-4">
                    <button>
                      <PencilSimpleLineIcon
                        className="fill-neutral-600"
                        size={18}
                      />
                    </button>

                    <button>
                      <TrashIcon className="fill-red-600" size={18} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <div className="w-full p-4 flex justify-between items-center">
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
