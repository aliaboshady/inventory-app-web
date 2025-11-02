import * as Yup from "yup";

export const validationSchema = {
  login: Yup.object({
    username: Yup.string().required("USERNAME_REQUIRED"),
    password: Yup.string().required("PASSWORD_REQUIRED").min(6, "PASSWORD_MIN"),
  }),
};
