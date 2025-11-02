"use client";

import { BellIcon, StarIcon, UserIcon } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";
import { Separator } from "./ui/separator";
import { useTranslation } from "react-i18next";

type Props = {
  title: string;
  children: React.ReactNode;
};

const PageLayout = ({ title, children }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-[calc(100vh+20rem)] sm:h-[calc(100vh-5rem)] px-4 md:px-10 xl:px-20 py-8 flex flex-col gap-6 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-end transition-all">
        <p className="w-full text-base font-semibold order-2 sm:order-1">
          {t(title)}
        </p>

        <div className="w-full flex flex-row gap-4 order-1 justify-between sm:justify-end sm:order-2">
          <Badge
            variant="default"
            className="text-lg gap-2 rounded-full text-nowrap"
          >
            <StarIcon size={18} weight="fill" />
            {t("SUPER_ADMIN")}
          </Badge>

          <div className="flex flex-row gap-4">
            <button className="bg-secondary p-1.5 rounded-full">
              <BellIcon className="fill-primary" size={25} />
            </button>

            <button className="bg-secondary p-1.5 rounded-full">
              <UserIcon className="fill-primary" size={25} />
            </button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Body */}
      <div className="bg-white w-full h-[calc(100vh+8rem)] sm:h-[calc(100vh-14rem)] flex flex-col gap-4 shadow-md p-4 border rounded-2xl">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
