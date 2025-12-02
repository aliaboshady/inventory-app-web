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
import { CaretDownIcon, GlobeSimpleIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { useTopLoader } from "nextjs-toploader";
import { COOKIES_KEYS } from "@/lib/staticKeys";
import { getCookie } from "@/actions/cookies/getCookie.action";
import { setCookie } from "@/actions/cookies/setCookie.action";

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
        <Button className="group text-primary hover:text-white fill-primary group-hover:fill-white font-medium bg-white">
          <GlobeSimpleIcon />

          {t(languages[currentLocale])}

          <CaretDownIcon
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </Button>
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
            className="text-primary hover:data-[state=checked]:!text-white font-medium [&>span]:hidden p-2 flex justify-center
                       data-[state=checked]:bg-primary data-[state=checked]:text-white font-googlesans"
          >
            {t("ENGLISH")}
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem
            value="ar"
            className="text-primary hover:data-[state=checked]:!text-white font-medium [&>span]:hidden p-2 flex justify-center
                       data-[state=checked]:bg-primary data-[state=checked]:text-white font-quicksand"
          >
            {t("ARABIC")}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
