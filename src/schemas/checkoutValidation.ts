import * as Yup from "yup";

export const checkoutValidationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Invalid phone number")
    .required("Phone number is required"),

  address: Yup.string().required("Address is required"),

  city: Yup.string().required("City is required"),

  state: Yup.string().required("State is required"),

  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, "Invalid pincode")
    .required("Pincode is required"),
});