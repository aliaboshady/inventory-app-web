"use client";

import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { combineLocalDateAndTime } from "@/lib/utils";
import { Button } from "../ui/button";
import FormikTextInput from "../FormikInputs/FormikTextInput";
import FormikDropdown from "../FormikInputs/FormikDropdown";
import FormikTextArea from "../FormikInputs/FormikTextArea";
import FormikRadioGroup from "../FormikInputs/FormikRadioGroup";
import FormikCheckboxGroup from "../FormikInputs/FormikCheckboxGroup";

const sessionTypes = [
  { value: "RETURNEES", label: "RETURNEES" },
  { value: "IRREGULAR_MIGRATION", label: "IRREGULAR_MIGRATION" },
];

const NeedsAssessmentToolForm = () => {
  const { t } = useTranslation();
  const now = new Date();

  const formik = useFormik({
    initialValues: {
      sessionType: "",
      caseManagementNumber: "",
      date: now,
      time: now.toISOString().slice(11, 16),
      note: "",
      gender: "",
      temp: "",
    },
    onSubmit: async (values) => {
      const combined = combineLocalDateAndTime(values.date, values.time);
      const finalValues = {
        ...values,
        dateTime: combined ? combined.toISOString() : "",
      };
      console.log("Submitted:", finalValues);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-x-4 gap-y-6"
    >
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        <FormikDropdown
          items={sessionTypes}
          formik={formik}
          name="sessionType"
          label={t("SESSION_TYPE")}
          placeholder={t("ENTER_SESSION_TYPE")}
        />

        <FormikTextInput
          formik={formik}
          name="caseManagementNumber"
          label={t("CASE_MANAGEMENT_NUMBER")}
          placeholder={t("ENTER_CASE_MANAGEMENT_NUMBER")}
        />

        <FormikRadioGroup
          formik={formik}
          name="gender"
          options={sessionTypes}
          label={t("GENDER")}
        />

        <FormikCheckboxGroup
          formik={formik}
          name="temp"
          options={sessionTypes}
          label={t("TEMP")}
        />
      </div>

      <FormikTextArea
        formik={formik}
        name="note"
        label={t("NOTE")}
        placeholder={t("ADD_NOTE")}
      />

      <div className="flex flex-row justify-end">
        <Button type="submit" className="h-12 w-fit">
          {t("NEXT")}
        </Button>
      </div>
    </form>
  );
};

export default NeedsAssessmentToolForm;
