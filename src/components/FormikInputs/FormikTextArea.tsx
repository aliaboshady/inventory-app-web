import { FormikValues } from "formik";
import ReactQuill from "react-quill-new";

type Props = {
  formik: FormikValues;
  name: string;
  label?: string;
  placeholder?: string;
};

const FormikTextArea = ({ formik, name, label, placeholder }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>

      <ReactQuill
        theme="snow"
        value={formik.values[name]}
        onChange={(val) => formik.setFieldValue(name, val)}
        className="rounded-lg border-2"
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormikTextArea;
