"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobeSimpleIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { useTopLoader } from "nextjs-toploader";
import { COOKIES_KEYS } from "@/lib/staticKeys";
import { getCookie } from "@/actions/cookies/getCookie.action";
import { setCookie } from "@/actions/cookies/setCookie.action";
import { SidebarMenuButton } from "./ui/sidebar";

export function DropdownLanguage() {
  const { t } = useTranslation();
  const [currentLocale, setCurrentLocale] = useState("");
  const { start: startTopLoader } = useTopLoader();

  useEffect(() => {
    (async () => {
      const newLocale = await getCookie(COOKIES_KEYS.locale);
      setCurrentLocale(newLocale);
    })();
  }, []);

  const languages: Record<string, string> = {
    en: "ENGLISH",
    ar: "ARABIC",
  };

  const handleChange = async (newLocale: string) => {
    await setCookie(COOKIES_KEYS.locale, newLocale, { httpOnly: true });
    setCurrentLocale(newLocale);
    startTopLoader();
    // window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          tooltip={t("SETTINGS")}
          className="py-6 group-data-[collapsible=icon]:p-2 hover:bg-white/10 active:bg-primary"
        >
          <div className="flex items-center gap-2">
            <GlobeSimpleIcon className="!w-8 !h-8 fill-white" />

            <span className="text-xl text-white">
              {t("LANGUAGE")}
            </span>
          </div>
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="min-w-0 w-fit"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuRadioGroup
          value={currentLocale}
          onValueChange={handleChange}
        >
          <DropdownMenuRadioItem
            value="en"
            className="text-primary hover:!text-primary font-medium [&>span]:hidden p-2 flex justify-center
                       data-[state=checked]:bg-secondary data-[state=checked]:text-primary"
          >
            {t("ENGLISH")}
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem
            value="ar"
            className="text-primary hover:!text-primary font-medium [&>span]:hidden p-2 flex justify-center
                       data-[state=checked]:bg-secondary data-[state=checked]:text-primary"
          >
            {t("ARABIC")}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
