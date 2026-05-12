import * as Yup from "yup";

export const productValidationSchema =
  Yup.object({
    title: Yup.string().required(
      "Title is required"
    ),

    description:
      Yup.string().required(
        "Description is required"
      ),

    category:
      Yup.string().required(
        "Category is required"
      ),

    image: Yup.string()
      .url("Enter valid image URL")
      .required("Image is required"),

    price: Yup.number()
      .positive(
        "Price must be positive"
      )
      .required("Price is required"),

    rating: Yup.number()
      .min(1)
      .max(5)
      .required("Rating is required")
  });