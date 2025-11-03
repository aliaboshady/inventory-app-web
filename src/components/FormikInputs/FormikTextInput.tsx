import { FormikValues } from "formik";
import TextInput from "../TextInput";

type Props = {
  formik: FormikValues;
  name: string;
  label?: string;
  placeholder?: string;
};

const FormikTextInput = ({ formik, name, label, placeholder }: Props) => {
  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      value={formik.values[name]}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      name={name}
      error={
        formik.touched[name] && formik.errors[name] ? formik.errors[name] : ""
      }
    />
  );
};

export default FormikTextInput;
