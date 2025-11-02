"use client";

import { Button } from "../ui/button";
import { getTailwindColor, handleErrorToast } from "@/lib/utils";
import { EnvelopeSimpleIcon, KeyIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { login, LoginPayload } from "@/actions/auth/login.action";
import { ServerResponse } from "@/model/shared.models";
import { Auth } from "@/model/user.model";
import { useRouter } from "next/navigation";
import { useTopLoader } from "nextjs-toploader";
import { ROUTES } from "@/lib/staticKeys";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { validationSchema } from "@/lib/validation";
import TextInput from "@/components/TextInput";
import useRequest from "@/hooks/useRequest";

const Form = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { start: startTopLoader } = useTopLoader();

  const { request: requestLogin, isLoading } = useRequest<
    LoginPayload,
    ServerResponse<Auth>
  >(login);

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: validationSchema.login,
    onSubmit: async (values) => {
      const res = await requestLogin(values);
      if (res?.data) {
        toast.success(res?.message);
        startTopLoader();
        setTimeout(() => router.push(ROUTES.root.url), 200);
      } else {
        handleErrorToast(res?.error);
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
  } = formik;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <TextInput
        label={t("USERNAME")}
        placeholder={t("ENTER_USERNAME")}
        value={values.username}
        onBlur={handleBlur}
        onChange={handleChange}
        name="username"
        labelClassName="text-lg text-primary"
        inputClassName={`h-14 focus:border-primary ${
          touched.username && errors.username ? "border-red-500" : ""
        }`}
        fontSize={20}
        icon={
          <EnvelopeSimpleIcon size={25} color={getTailwindColor("primary")} />
        }
        error={t(touched.username && errors.username ? errors.username : "")}
      />

      <TextInput
        label={t("PASSWORD")}
        placeholder={t("ENTER_PASSWORD")}
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
        name="password"
        icon={<KeyIcon size={25} color={getTailwindColor("primary")} />}
        labelClassName="text-lg text-primary"
        inputClassName={`h-14 focus:border-primary ${
          touched.password && errors.password ? "border-red-500" : ""
        }`}
        fontSize={20}
        isPassword
        error={t(touched.password && errors.password ? errors.password : "")}
      />

      <Button
        disabled={!isValid || isLoading}
        className={`h-12 rounded-lg text-xl ${
          isValid ? "text-white" : "text-primary"
        }`}
        variant={isValid ? "default" : "secondary"}
        type="submit"
      >
        {t("SIGNIN")}
      </Button>
    </form>
  );
};

export default Form;
