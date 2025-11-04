"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FormikValues } from "formik";

type Props = {
  formik: FormikValues;
  name: string;
  label?: string;
  options: { label: string; value: string }[];
};

export default function FormikCheckboxGroup({
  formik,
  name,
  label,
  options,
}: Props) {
  const selectedValues: string[] = formik.values[name] || [];

  const handleChange = (value: string, checked: boolean) => {
    let newValues;
    if (checked) {
      newValues = [...selectedValues, value];
    } else {
      newValues = selectedValues.filter((v) => v !== value);
    }
    formik.setFieldValue(name, newValues);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <Label>{label}</Label>}

      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={option.value}
              checked={selectedValues.includes(option.value)}
              onCheckedChange={(checked) =>
                handleChange(option.value, checked === true)
              }
            />
            <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}
