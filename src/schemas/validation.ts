import * as Yup from "yup";

export const registerSchema = Yup.object({

  name: Yup.string()
    .min(3, "Minimum 3 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be 6 characters")
    .required("Password is required")

});

export const loginSchema = Yup.object({

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")

});