"use client";

import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import FormikTextInput from "../FormikInputs/FormikTextInput";
import FormikDropdown from "../FormikInputs/FormikDropdown";

const sessionTypes = [
  { value: "RETURNEES", label: "RETURNEES" },
  { value: "IRREGULAR_MIGRATION", label: "IRREGULAR_MIGRATION" },
];

const SessionDetailsForm = () => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      sessionType: "",
      caseManagementNumber: "",
      date: "",
      time: "",
      note: "",
    },
    onSubmit: async (values) => {},
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
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
    </form>
  );
};

export default SessionDetailsForm;
