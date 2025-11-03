import { FormikValues } from "formik";
import { Label } from "../ui/label";
import Dropdown from "../Dropdown";

type Props = {
  formik: FormikValues;
  items: { label: string; value: string }[];
  name: string;
  label?: string;
  placeholder?: string;
};

const FormikDropdown = ({ formik, items, name, label, placeholder }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>

      <Dropdown
        items={items}
        selected={formik.values[name]}
        placeholder={placeholder}
        setSelected={(val: string) => formik.setFieldValue(name, val)}
        onBlur={formik.handleBlur}
        error={
          formik.touched[name] && formik.errors[name] ? formik.errors[name] : ""
        }
      />
    </div>
  );
};

export default FormikDropdown;
