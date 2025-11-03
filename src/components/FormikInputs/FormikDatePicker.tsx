import React from "react";
import { DatePicker } from "../DatePicker";
import { Label } from "../ui/label";
import { FormikValues } from "formik";

type Props = {
  formik: FormikValues;
  name: string;
  label?: string;
  placeholder?: string;
};

const FormikDatePicker = ({ formik, name, label, placeholder }: Props) => {
  return (
    <div className="flex flex-col gap-2 relative">
      {label && <Label>{label}</Label>}

      <DatePicker
        date={formik.values[name]}
        setDate={(val: Date) => formik.setFieldValue(name, val)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormikDatePicker;
