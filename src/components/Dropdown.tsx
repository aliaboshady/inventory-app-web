"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { CaretDownIcon, XIcon } from "@phosphor-icons/react/dist/ssr";

type Props = {
  setChosenValue: (val: string | string[]) => void;
  chosenValue?: string | string[];
  placeholder?: string;
  placeholderOnly?: boolean;
  items: string[];
  displayItems?: string[];
  buttonClassName?: string;
  dropdownClassName?: string;
  itemClassName?: string;
  translateItems?: boolean;
  translateDisplayItems?: boolean;
  multiSelect?: boolean;
  previewChosenValues?: boolean;
  disabled?: boolean;
  showNullOption?: boolean;
  nullOptionValue?: string;
};

export function Dropdown({
  setChosenValue,
  chosenValue,
  placeholder,
  placeholderOnly = false,
  items,
  displayItems,
  buttonClassName,
  dropdownClassName,
  itemClassName,
  translateItems = true,
  translateDisplayItems = true,
  multiSelect = false,
  previewChosenValues = false,
  disabled = false,
  showNullOption = true,
  nullOptionValue = "",
}: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const getDisplayName = (value: string) => {
    if (!displayItems || items.length !== displayItems.length) return value;
    const index = items.indexOf(value);
    return displayItems[index] ?? value;
  };

  const renderDisplayText = () => {
    if (placeholderOnly) return t(placeholder || "");

    if (
      !chosenValue ||
      (Array.isArray(chosenValue) && chosenValue.length === 0)
    ) {
      return t(placeholder || "");
    }

    if (Array.isArray(chosenValue)) {
      return chosenValue.map((val) => t(getDisplayName(val))).join(", ");
    }

    return t(getDisplayName(chosenValue));
  };

  const handleSelect = (item: string) => {
    if (!Array.isArray(chosenValue)) return;

    const newSelected = chosenValue.includes(item)
      ? chosenValue.filter((val) => val !== item)
      : [...chosenValue, item];

    (setChosenValue as Dispatch<SetStateAction<string[]>>)(newSelected);

    if (displayItems) {
      const newDisplay = items
        .map((code, idx) =>
          newSelected.includes(code) ? displayItems[idx] : null
        )
        .filter((val): val is string => val !== null);
    }
  };

  return (
    <>
      <DropdownMenu onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild disabled={disabled}>
          <Button
            variant="ghost"
            className={twMerge(
              "h-12 border rounded-lg flex justify-start relative font-medium bg-white hover:bg-white focus:outline-none focus-visible:outline-none",
              buttonClassName
            )}
          >
            <p className="truncate w-fit max-w-[calc(100%-8px)]">
              {renderDisplayText()}
            </p>

            <div className="absolute end-2">
              <CaretDownIcon
                className={`fill-primary transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className={twMerge(
            "min-w-[--radix-dropdown-menu-trigger-width] max-w-[--radix-dropdown-menu-trigger-width]",
            dropdownClassName
          )}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {multiSelect ? (
            items &&
            items.map((item, i) => {
              const isSelected =
                Array.isArray(chosenValue) && chosenValue.includes(item);

              const displayItem = displayItems
                ? translateDisplayItems
                  ? t(displayItems[i])
                  : displayItems[i]
                : translateItems
                ? t(item)
                : item;

              return (
                <DropdownMenuItem
                  key={item}
                  onSelect={(e) => {
                    if (multiSelect) e.preventDefault();
                    handleSelect(item);
                  }}
                  className={twMerge(
                    "truncate font-medium px-2 py-2 cursor-pointer flex rtl:justify-end",
                    itemClassName,
                    isSelected ? "bg-secondary" : ""
                  )}
                >
                  {isSelected ? (
                    <div className="flex flex-row justify-between w-full">
                      <div className="order-1 rtl:order-2">{displayItem}</div>
                      <p className="order-2 rtl:order-1 text-primary">✓</p>
                    </div>
                  ) : (
                    displayItem
                  )}
                </DropdownMenuItem>
              );
            })
          ) : (
            <DropdownMenuRadioGroup
              value={chosenValue as string}
              onValueChange={setChosenValue as Dispatch<SetStateAction<string>>}
            >
              {items && (
                <>
                  {showNullOption && (
                    <DropdownMenuRadioItem
                      value={nullOptionValue}
                      className={twMerge(
                        "truncate font-medium px-2 py-2 cursor-pointer flex rtl:justify-end",
                        itemClassName
                      )}
                    >
                      <p className="text-white">.</p>
                    </DropdownMenuRadioItem>
                  )}

                  {items.map((item, i) => {
                    const displayItem = displayItems
                      ? translateDisplayItems
                        ? t(displayItems[i])
                        : displayItems[i]
                      : translateItems
                      ? t(item)
                      : item;

                    return (
                      <DropdownMenuRadioItem
                        key={item}
                        value={item}
                        className={twMerge(
                          "truncate font-medium px-2 py-2 cursor-pointer flex rtl:justify-end",
                          itemClassName
                        )}
                      >
                        {displayItem}
                      </DropdownMenuRadioItem>
                    );
                  })}
                </>
              )}
            </DropdownMenuRadioGroup>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Preview selected values */}
      {multiSelect && previewChosenValues && Array.isArray(chosenValue) && (
        <div className="mt-4 flex flex-row flex-wrap gap-4">
          {chosenValue.map((code) => {
            const display = getDisplayName(code);
            return (
              <div
                key={code}
                className="bg-white p-2 w-fit h-fit flex flex-row gap-2 justify-between items-center rounded-ts-xl rounded-be-xl"
              >
                <p>{t(display)}</p>
                <button
                  onClick={() => handleSelect(code)}
                  className="hover:opacity-70 transition-opacity"
                >
                  <XIcon className="w-4 h-4 text-danger" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export const ChosenValuePreviewCard = ({
  displayedText,
}: {
  displayedText: string;
}) => {
  return (
    <div className="bg-white p-2 w-fit h-fit flex flex-row gap-5 justify-between items-center rounded-ts-xl rounded-be-xl">
      <p>{displayedText}</p>

      <button>
        <XIcon className="w-5 h-5 text-danger" />
      </button>
    </div>
  );
};
