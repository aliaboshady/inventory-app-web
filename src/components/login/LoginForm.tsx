"use client";

import { Button } from "../ui/button";
import { getTailwindColor } from "@/lib/utils";
import { EnvelopeSimpleIcon, KeyIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { login, LoginPayload } from "@/actions/auth/login.action";
import { Auth } from "@/models/user.model";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/staticKeys";
import { useFormik } from "formik";
import TextInput from "@/components/TextInput";
import useRequest from "@/hooks/useRequest";

const LoginForm = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { request: requestLogin, isLoading } = useRequest<LoginPayload, Auth>(
    login,
    {
      showSuccessToast: true,
      successToastMessage: "LOGIN_SUCCESSFUL",
      onSuccess: () => setTimeout(() => router.push(ROUTES.root.url), 200),
    }
  );

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async (values) => {
      const res = await requestLogin(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
      <TextInput
        label={t("EMAIL")}
        placeholder={t("ENTER_EMAIL")}
        value={formik.values.email}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        name="email"
        labelClassName="text-lg text-primary"
        inputClassName="h-14 focus:border-primary"
        fontSize={20}
        icon={
          <EnvelopeSimpleIcon size={25} color={getTailwindColor("primary")} />
        }
        error={t(
          formik.touched.email && formik.errors.email ? formik.errors.email : ""
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
        disabled={isLoading}
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
