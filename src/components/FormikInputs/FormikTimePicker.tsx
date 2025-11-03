import { FormikValues } from "formik";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ClockIcon } from "@phosphor-icons/react";

type Props = {
  formik: FormikValues;
  name: string;
  label?: string;
  placeholder?: string;
};

const FormikTimePicker = ({ formik, name, label, placeholder }: Props) => {
  const handleIconClick = () => {
    const input = document.querySelector<HTMLInputElement>(
      `input[name="${name}"]`
    );
    input?.showPicker?.();
  };

  return (
    <div className="flex flex-col gap-2 relative">
      {label && <Label>{label}</Label>}

      <div className="h-12 w-full bg-white rounded-lg hover:bg-accent border-2 flex flex-row">
        <Input
          type="time"
          dir="auto"
          placeholder={placeholder}
          value={formik.values[name]}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          name={name}
          className={`
            h-full w-20 border-none shadow-none focus-visible:outline-none focus-visible:ring-0
            [&::-webkit-calendar-picker-indicator]:hidden
          `}
        />

        <button
          type="button"
          onClick={handleIconClick}
          className="w-full pe-4 flex items-center justify-end text-primary"
        >
          <ClockIcon size={18} />
        </button>
      </div>
    </div>
  );
};

export default FormikTimePicker;
