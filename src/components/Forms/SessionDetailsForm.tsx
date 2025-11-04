"use client";

import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { combineLocalDateAndTime } from "@/lib/utils";
import { Button } from "../ui/button";
import FormikTextInput from "../FormikInputs/FormikTextInput";
import FormikDropdown from "../FormikInputs/FormikDropdown";
import FormikTimePicker from "../FormikInputs/FormikTimePicker";
import FormikDatePicker from "../FormikInputs/FormikDatePicker";
import FormikTextArea from "../FormikInputs/FormikTextArea";

const sessionTypes = [
  { value: "RETURNEES", label: "RETURNEES" },
  { value: "IRREGULAR_MIGRATION", label: "IRREGULAR_MIGRATION" },
];

const SessionDetailsForm = () => {
  const { t } = useTranslation();
  const now = new Date();

  const formik = useFormik({
    initialValues: {
      sessionType: "",
      caseManagementNumber: "",
      date: now,
      time: now.toISOString().slice(11, 16),
      note: "",
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

        <FormikTimePicker
          formik={formik}
          name="time"
          label={t("TIME")}
          placeholder={t("ENTER_TIME")}
        />

        <FormikDatePicker formik={formik} name="date" label={t("DATE")} />
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

export default SessionDetailsForm;
