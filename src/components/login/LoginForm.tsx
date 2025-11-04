"use client";

import { Button } from "../ui/button";
import { getTailwindColor, handleErrorToast } from "@/lib/utils";
import { EnvelopeSimpleIcon, KeyIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { login, LoginPayload } from "@/actions/auth/login.action";
import { ServerResponse } from "@/models/shared.model";
import { Auth } from "@/models/user.model";
import { useRouter } from "next/navigation";
import { useTopLoader } from "nextjs-toploader";
import { ROUTES } from "@/lib/staticKeys";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { validationSchema } from "@/lib/validation";
import TextInput from "@/components/TextInput";
import useRequest from "@/hooks/useRequest";

const LoginForm = () => {
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

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
      <TextInput
        label={t("USERNAME")}
        placeholder={t("ENTER_USERNAME")}
        value={formik.values.username}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        name="username"
        labelClassName="text-lg text-primary"
        inputClassName="h-14 focus:border-primary"
        fontSize={20}
        icon={
          <EnvelopeSimpleIcon size={25} color={getTailwindColor("primary")} />
        }
        error={t(
          formik.touched.username && formik.errors.username
            ? formik.errors.username
            : ""
        )}
      />

      <TextInput
        label={t("PASSWORD")}
        placeholder={t("ENTER_PASSWORD")}
        value={formik.values.password}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        name="password"
        icon={<KeyIcon size={25} color={getTailwindColor("primary")} />}
        labelClassName="text-lg text-primary"
        inputClassName="h-14 focus:border-primary"
        fontSize={20}
        isPassword
        error={t(
          formik.touched.password && formik.errors.password
            ? formik.errors.password
            : ""
        )}
      />

      <Button
        disabled={!formik.isValid || isLoading}
        className={`h-12 rounded-lg text-xl ${
          formik.isValid ? "text-white" : "text-primary"
        }`}
        variant={formik.isValid ? "default" : "secondary"}
        type="submit"
      >
        {t("SIGNIN")}
      </Button>
    </form>
  );
};

export default LoginForm;
