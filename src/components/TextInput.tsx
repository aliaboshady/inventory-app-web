"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getTailwindColor } from "@/lib/utils";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { HTMLInputTypeAttribute, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  name?: string;
  value: string;
  setValue?: (val: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  type?: HTMLInputTypeAttribute;
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  fontSize?: number;
  error?: string;
};

const TextInput = ({
  name,
  value,
  setValue,
  onChange,
  onBlur,
  onFocus,
  type = "text",
  label,
  placeholder,
  icon,
  isPassword,
  className,
  inputClassName,
  labelClassName,
  fontSize = 16,
  error,
}: Props) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <div className={twMerge("flex flex-col gap-2", className)}>
      {label && (
        <Label htmlFor={name} className={labelClassName}>
          {label}
        </Label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute start-4 top-1/2 -translate-y-1/2">
            {icon}
          </div>
        )}

        <Input
          id={name}
          name={name}
          value={value}
          onChange={(e) => {
            e.preventDefault();
            if (onChange) onChange(e);
            else if (setValue) setValue(e.target.value);
          }}
          onBlur={onBlur}
          onFocus={onFocus}
          type={isPassword && !isPasswordShown ? "password" : type}
          placeholder={placeholder}
          className={twMerge(
            `h-12 bg-white border-2 rounded-lg focus-visible:outline-none focus-visible:ring-0 transition-colors ${
              icon ? "ps-12" : ""
            } ${isPassword ? "pe-12" : ""} ${
              error ? "border-danger focus:border-danger" : ""
            }`,
            inputClassName
          )}
          style={{ fontSize }}
        />

        {isPassword && (
          <button
            className="absolute end-4 top-1/2 -translate-y-1/2"
            onClick={() => setIsPasswordShown(!isPasswordShown)}
            type="button"
          >
            {isPasswordShown ? (
              <EyeIcon size={25} color={getTailwindColor("primary")} />
            ) : (
              <EyeSlashIcon size={25} color={getTailwindColor("primary")} />
            )}
          </button>
        )}

        {error && (
          <div className="absolute start-3 bottom-2 translate-y-full px-2">
            <div className="absolute bottom-2 start-0 end-0 bg-white h-1 -z-10" />
            <p className="text-xs text-danger font-medium whitespace-nowrap">
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextInput;
