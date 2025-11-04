"use client";

import { useState } from "react";
import { Separator } from "../ui/separator";
import { useTranslation } from "react-i18next";
import { FormPage, FormTab } from "./FormTabs";
import SessionDetailsForm from "./SessionDetailsForm";
import NeedsAssessmentToolForm from "./NeedsAssessmentToolForm";

type Props = {
  title: string;
};

const PageLayout = ({ title }: Props) => {
  const { t } = useTranslation();
  const [activeForm, setActiveForm] = useState(1);

  return (
    <div className="w-full px-4 md:px-10 xl:px-20 my-8 flex flex-col gap-6 transition-all">
      {/* Title */}
      <p className="w-full text-base font-semibold">{t(title)}</p>

      <Separator />

      {/* Header */}
      <div className="flex justify-center">
        <div className="flex flex-row gap-4 items-center py-4 overflow-x-auto scrollbar-thin transition-all">
          <FormTab
            id={1}
            title="Add Session Details"
            activeId={activeForm}
            setActiveId={setActiveForm}
          />

          <div className="w-20 border-t border-dashed border-primary -translate-y-3" />

          <FormTab
            id={2}
            title="Needs Assessment Tool"
            activeId={activeForm}
            setActiveId={setActiveForm}
          />

          <div className="w-20 border-t border-dashed border-primary -translate-y-3" />

          <FormTab
            id={3}
            title="Fast-Track Employment"
            activeId={activeForm}
            setActiveId={setActiveForm}
          />

          <div className="w-20 border-t border-dashed border-primary -translate-y-3" />

          <FormTab
            id={4}
            title="Employment Pathway"
            activeId={activeForm}
            setActiveId={setActiveForm}
          />
        </div>
      </div>

      {/* Body */}
      <FormPage id={1} activeId={activeForm}>
        <SessionDetailsForm />
      </FormPage>

      <FormPage id={2} activeId={activeForm}>
        <NeedsAssessmentToolForm />
      </FormPage>
    </div>
  );
};

export default PageLayout;
