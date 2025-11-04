import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormikValues } from "formik";

type Props = {
  formik: FormikValues;
  name: string;
  label?: string;
  options: { label: string; value: string }[];
};

const FormikRadioGroup = ({ formik, name, label, options }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <Label>{label}</Label>}

      <RadioGroup
        className="flex flex-row gap-6 flex-wrap"
        value={formik.values[name]}
        onValueChange={(val) => formik.setFieldValue(name, val)}
        name={name}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.value} />
            <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FormikRadioGroup;
