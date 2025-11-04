"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsThreeVerticalIcon } from "@phosphor-icons/react/dist/ssr";
import { DialogSettings } from "@/models/shared.model";
import Link from "next/link";

type Props = {
  settings: DialogSettings[];
  item: any;
};

export default function TableSettings({ settings, item }: Props) {
  const extractedSettings = Array.isArray(settings) ? settings : [];

  const [open, setOpen] = useState<boolean[]>(
    Array(extractedSettings.length).fill(false)
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="text-neutral-4 font-medium bg-transparent hover:bg-transparent focus:outline-none focus-visible:outline-none"
          >
            <DotsThreeVerticalIcon weight="bold" className="!w-5 !h-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuRadioGroup>
            {extractedSettings.map((setting, settingIndex) => (
              <DropdownMenuItem
                key={settingIndex}
                className="rtl:justify-end"
                onClick={
                  !setting?.href
                    ? () =>
                        setOpen((prev) =>
                          prev.map((val, i) =>
                            i === settingIndex ? true : val
                          )
                        )
                    : null
                }
              >
                {setting?.href ? (
                  <Link href={setting?.href} className="flex flex-row gap-1.5">
                    {setting?.icon}
                    {setting?.label}
                  </Link>
                ) : (
                  <>
                    {setting?.icon}
                    {setting?.label}
                  </>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {extractedSettings.map((setting, i) => {
        const DialogComponent = setting.dialog;
        return (
          open[i] && (
            <DialogComponent
              key={i}
              open={open[i]}
              setOpen={(val) =>
                setOpen((prev) => prev.map((v, j) => (j === i ? val : v)))
              }
              item={item}
              onAction={setting.onAction}
            />
          )
        );
      })}
    </>
  );
}
