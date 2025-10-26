"use client";

import TextInput from "@/components/TextInput";
import { Dropdown } from "@/components/Dropdown";
import { Button } from "@/components/ui/button";
import { useResponsiveSize } from "@/hooks/useResponsiveSize";
import { getTailwindColor } from "@/lib/utils";
import { MagnifyingGlassIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { useTranslation } from "react-i18next";

const Filter = () => {
  const { t } = useTranslation();
  const {
    containerRef,
    outFlags: {
      width: [breakpoint1, breakpoint2],
    },
  } = useResponsiveSize({
    breakpoints: [725, 440],
  });
  const roles = ["ADMIN", "SUPER_ADMIN"];

  return (
    <div
      ref={containerRef}
      className={`flex gap-4 ${
        breakpoint1 ? "flex-col" : "flex-row justify-between items-center"
      } ${breakpoint2 ? "items-stretch" : "items-end"}`}
    >
      <div
        className={`flex gap-4 w-full ${breakpoint2 ? "flex-col" : "flex-row"}`}
      >
        <TextInput
          placeholder={t("Search")}
          value={""}
          setValue={() => {}}
          icon={
            <MagnifyingGlassIcon
              size={25}
              color={getTailwindColor("neutral-500")}
            />
          }
          className={`rounded-xl ${
            breakpoint2 ? "w-full" : breakpoint1 ? "w-2/3" : "w-96"
          }`}
          inputClassName="h-12"
        />

        <Dropdown
          items={roles}
          chosenValue={""}
          placeholder={t("ROLE")}
          setChosenValue={(val: string | string[]) => {}}
          buttonClassName={`h-12 ${
            breakpoint2 ? "w-full" : breakpoint1 ? "w-1/3" : "w-40"
          }`}
        />
      </div>

      <Button className="h-12 rounded-xl text-lg">
        <PlusIcon color="white" weight="bold" /> Add admin
      </Button>
    </div>
  );
};

export default Filter;
