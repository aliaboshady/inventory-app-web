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
    <div className="w-full px-4 md:px-10 xl:px-20 my-8 flex flex-col gap-6 transition-all">
      {/* Title */}
      <p className="w-full text-base font-semibold">{t(title)}</p>

      <Separator />

      {/* Header */}
      <div className="flex justify-center">
        <div className="flex flex-row gap-4 items-center py-4 overflow-x-auto no-scrollbar transition-all">
          <FormNumber id={1} title="Add Session Details" activeId={1} />
          <div className="w-20 border-t border-dashed border-primary -translate-y-3" />
          <FormNumber id={2} title="Needs Assessment Tool" activeId={1} />
          <div className="w-20 border-t border-dashed border-primary -translate-y-3" />
          <FormNumber id={3} title="Fast-Track Employment" activeId={1} />
          <div className="w-20 border-t border-dashed border-primary -translate-y-3" />
          <FormNumber id={4} title="Employment Pathway" activeId={1} />
        </div>
      </div>

      {/* Body */}
      <div className="bg-white w-full h-[calc(100vh-16rem)] sm:min-h-[calc(100vh-14rem)] flex flex-col gap-4 shadow-md p-4 border rounded-2xl">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;

const FormNumber = ({
  id,
  title,
  activeId,
}: {
  id: number;
  activeId: number;
  title: string;
}) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div
        className={`rounded-full bg-white p-1 w-10 h-10 ${
          activeId === id ? "border shadow-md" : ""
        }`}
      >
        <div
          className={`rounded-full ${
            activeId === id ? "bg-primary" : "bg-white border-2"
          } w-full h-full flex justify-center items-center`}
        >
          <p className={`${activeId === id ? "text-white" : "text-black"}`}>
            {id}
          </p>
        </div>
      </div>

      <p
        className={`${
          activeId === id ? "text-primary" : "text-neutral-400"
        } text-xs font-medium text-nowrap`}
      >
        {title}
      </p>
    </div>
  );
};
