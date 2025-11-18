"use client";

import { Separator } from "./ui/separator";
import { useTranslation } from "react-i18next";

type Props = {
  title: string;
  children: React.ReactNode;
};

const PageLayout = ({ title, children }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full bg-neutral-100 px-4 md:px-10 xl:px-20 py-8 flex flex-col gap-6 transition-all">
      {/* Title */}
      <p className="w-full text-base font-semibold">{t(title)}</p>

      <Separator className="bg-neutral-300" />

      {/* Body */}
      <div className="bg-white w-full h-full flex flex-col gap-4 shadow-md p-4 border rounded-2xl">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
