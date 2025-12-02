"use client";

import { FocusEventHandler } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CaretDownIcon, CircleNotchIcon } from "@phosphor-icons/react/dist/ssr";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";

export type DropdownItem = {
  value: string;
  label: string;
  labelNode?: React.ReactNode;
};

type Props = {
  selected: string | string[];
  setSelected: ((val: string) => void) | ((val: string[]) => void);
  items: DropdownItem[];
  noneOptionValue?: string;
  allOptionValue?: string;
  showNoneOption?: boolean;
  showAllOption?: boolean;
  className?: string;
  contentClassName?: string;
  placeholder?: string;
  placeholderOnly?: boolean;
  disabled?: boolean;
  onReachTheEnd?: () => void;
  loadingData?: boolean;
  multiSelect?: boolean;
  searchable?: boolean;
  searchValue?: string;
  setSearchValue?: (val: string) => void;
  searchPlaceholder?: string;
  onBlur?: FocusEventHandler<HTMLDivElement>;
  error?: string;
};

export default function Dropdown({
  selected,
  setSelected,
  items,
  noneOptionValue = "NONE",
  allOptionValue = "ALL",
  showNoneOption,
  showAllOption,
  className,
  contentClassName,
  placeholder = "SELECT",
  placeholderOnly = false,
  disabled = false,
  onReachTheEnd,
  loadingData = false,
  multiSelect = false,
  searchable = false,
  searchValue,
  setSearchValue,
  searchPlaceholder = "SEARCH",
  onBlur,
  error,
}: Props) {
  const { t } = useTranslation();

  const renderSelectedText = () => {
    if (placeholderOnly) return t(placeholder);

    // 🧠 If nothing selected, show placeholder (even if showNoneOption is true)
    if (!selected || (Array.isArray(selected) && selected.length === 0)) {
      return t(placeholder);
    }

    if (Array.isArray(selected)) {
      return items
        ?.filter((val) => selected.includes(val.value))
        .map((val) => val.label)
        .join(", ");
    }

    const selectedItem = items?.find((item) => item.value === selected);

    const selectedValue =
      selectedItem?.labelNode || selectedItem?.label || selected;

    return typeof selectedValue === "string" ? (
      <p className="truncate">{t(selectedValue)}</p>
    ) : (
      selectedValue
    );
  };

  const handleSelectMultiple = (item: string) => {
    if (!multiSelect || !Array.isArray(selected)) return;

    const newSelected = selected.includes(item)
      ? selected.filter((val) => val !== item)
      : [...selected, item];

    (setSelected as (val: string[]) => void)(newSelected);
  };

  const handleSelectSingle = (value: string) => {
    (setSelected as (val: string) => void)(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <button
          className={twMerge(
            `h-12 flex flex-row items-center px-4 rounded-lg max-w-full min-w-0 group justify-between outline-none font-normal border-2 focus-visible:outline-none focus-visible:ring-0 ${
              !selected && "text-neutral-500"
            } ${error ? "border-danger focus:border-danger" : ""}`,
            className
          )}
        >
          {renderSelectedText()}

          {loadingData ? (
            <CircleNotchIcon className="animate-spin fill-primary" />
          ) : (
            <CaretDownIcon
              className="fill-primary ms-2 text-neutral-500 transition-transform duration-200 group-data-[state=open]:rotate-180"
              aria-hidden="true"
            />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        onBlur={onBlur}
        align="start"
        className={twMerge(
          "max-h-72 space-y-1 w-[--radix-dropdown-menu-trigger-width]",
          contentClassName
        )}
        onScroll={(e) => {
          if (loadingData) return;

          const el = e.currentTarget;
          if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
            onReachTheEnd?.();
          }
        }}
      >
        {/* Search input */}
        {searchable && (
          <div className="p-2">
            <Input
              value={searchValue}
              onChange={(e) => {
                e.preventDefault();
                setSearchValue?.(e.target.value);
              }}
              onKeyDown={(e) => e.stopPropagation()}
              placeholder={t(searchPlaceholder)}
              className="w-full"
            />
          </div>
        )}

        {(showNoneOption || showAllOption) && (
          <>
            <div className="flex flex-row justify-center">
              {/* None option */}
              {showNoneOption && (
                <DropdownMenuItem
                  onClick={(e) => {
                    // 🧹 Clear selection completely
                    if (multiSelect) {
                      e.preventDefault();
                      (setSelected as (val: string[]) => void)([]);
                    } else {
                      (setSelected as (val: string) => void)(undefined);
                    }
                  }}
                  className={twMerge(
                    "w-full justify-center hover:!bg-primary/20 hover:!text-primary",
                    (!selected ||
                      (Array.isArray(selected) && selected.length === 0)) &&
                      "bg-primary text-white"
                  )}
                >
                  {t(noneOptionValue)}
                </DropdownMenuItem>
              )}

              {/* ALL Option - only for multi-select */}
              {multiSelect && showAllOption && (
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    const allValues = items?.map((item) => item.value);
                    (setSelected as (val: string[]) => void)(allValues);
                  }}
                  className={twMerge(
                    "w-full justify-center hover:!bg-primary/20 hover:!text-primary",
                    Array.isArray(selected) &&
                      selected.length === items?.length &&
                      "bg-primary text-white"
                  )}
                >
                  {t(allOptionValue)}
                </DropdownMenuItem>
              )}
            </div>

            <DropdownMenuSeparator className="bg-primary/20" />
          </>
        )}

        {/* Multi Select */}
        {multiSelect ? (
          items &&
          items?.map((item) => {
            const isSelected =
              Array.isArray(selected) && selected.includes(item?.value);

            return (
              <DropdownMenuItem
                key={item?.value}
                dir="auto"
                onSelect={(e) => {
                  e.preventDefault();
                  handleSelectMultiple(item?.value);
                }}
                className={twMerge(
                  "font-medium px-2 py-2 cursor-pointer flex rtl:justify-end hover:!bg-primary/20 hover:!text-primary",
                  isSelected ? "bg-primary text-white" : ""
                )}
              >
                {item.labelNode ? (
                  item.labelNode
                ) : (
                  <p className="truncate">{t(item.label)}</p>
                )}
              </DropdownMenuItem>
            );
          })
        ) : (
          <>
            {/* Single Select */}
            {items?.map((item) => (
              <DropdownMenuItem
                key={item.value}
                onClick={() => handleSelectSingle(item.value)}
                dir="auto"
                className={`truncate hover:!bg-primary/20 hover:!text-primary ${
                  selected === item.value && "bg-primary text-white"
                }`}
              >
                {item.labelNode ? (
                  item.labelNode
                ) : (
                  <p className="truncate">{t(item.label)}</p>
                )}
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
