"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { useTopLoader } from "nextjs-toploader";
import { COOKIES_KEYS } from "@/lib/staticKeys";
import { getCookie } from "@/app/actions/cookies/getCookie.action";
import { setCookie } from "@/app/actions/cookies/setCookie.action";

export function DropdownLanguage() {
  const { t } = useTranslation();
  const [currentLocale, setCurrentLocale] = useState("");
  const [open, setOpen] = useState(false);
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
    <DropdownMenu onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-neutral-4 font-medium bg-white focus:outline-none focus-visible:outline-none"
        >
          {t(languages[currentLocale])}
          <ArrowDownIcon
            className={`fill-primary transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-0 w-fit">
        <DropdownMenuRadioGroup
          value={currentLocale}
          onValueChange={handleChange}
        >
          <DropdownMenuRadioItem
            value="en"
            className="text-neutral-2 font-medium [&>span]:hidden p-2 flex justify-center
                       data-[state=checked]:bg-primary-1 data-[state=checked]:text-primary-4"
          >
            {t("ENGLISH")}
          </DropdownMenuRadioItem>
          
          <DropdownMenuRadioItem
            value="ar"
            className="text-neutral-2 font-medium [&>span]:hidden p-2 flex justify-center
                       data-[state=checked]:bg-primary-1 data-[state=checked]:text-primary-4"
          >
            {t("ARABIC")}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
