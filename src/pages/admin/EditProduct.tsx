import {
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  TextField,
  Typography
} from "@mui/material";

import { Formik } from "formik";

import { toast } from "react-toastify";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import AdminLayout from "../../components/admin/AdminLayout";

import { useProduct } from "../../context/ProductContext";

import { productValidationSchema } from "../../schemas/productValidation";

export default function EditProduct() {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    products,
    updateProduct
  } = useProduct();

  const product = products.find(
    (item) =>
      item.id === Number(id)
  );

  if (!product) {
    return (
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700
          }}
        >
          Product not found
        </Typography>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 4
        }}
      >
        Edit Product
      </Typography>

      <Card
        sx={{
          p: 4,
          borderRadius: "24px",
          boxShadow: 4
        }}
      >
        <Formik
          initialValues={{
            title: product.title,
            description:
              product.description,
            category:
              product.category,
            image: product.image,
            price:
              product.price.toString(),
            rating:
              product.rating.toString()
          }}
          validationSchema={
            productValidationSchema
          }
          onSubmit={(values) => {
            updateProduct({
              ...product,
              title: values.title,
              description:
                values.description,
              category:
                values.category,
              image: values.image,
              price: Number(
                values.price
              ),
              rating: Number(
                values.rating
              )
            });

            toast.success(
              "Product updated successfully"
            );

            navigate(
              "/dashboard/products"
            );
          }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit
          }) => (
            <Box
              component="form"
              onSubmit={
                handleSubmit
              }
            >
              <Grid
                container
                spacing={3}
              >
                <Grid
                  size={{
                    xs: 12,
                    md: 6
                  }}
                >
                  <TextField
                    fullWidth
                    label="Product Title"
                    name="title"
                    value={values.title}
                    onChange={
                      handleChange
                    }
                    onBlur={
                      handleBlur
                    }
                    error={
                      touched.title &&
                      Boolean(
                        errors.title
                      )
                    }
                    helperText={
                      touched.title &&
                      errors.title
                    }
                  />
                </Grid>

                <Grid
                  size={{
                    xs: 12,
                    md: 6
                  }}
                >
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
                    value={values.price}
                    onChange={
                      handleChange
                    }
                    onBlur={
                      handleBlur
                    }
                    error={
                      touched.price &&
                      Boolean(
                        errors.price
                      )
                    }
                    helperText={
                      touched.price &&
                      errors.price
                    }
                  />
                </Grid>

                <Grid
                  size={{
                    xs: 12,
                    md: 6
                  }}
                >
                  <TextField
                    select
                    fullWidth
                    label="Category"
                    name="category"
                    value={
                      values.category
                    }
                    onChange={
                      handleChange
                    }
                    onBlur={
                      handleBlur
                    }
                    error={
                      touched.category &&
                      Boolean(
                        errors.category
                      )
                    }
                    helperText={
                      touched.category &&
                      errors.category
                    }
                  >
                    <MenuItem value="Beauty">
                      Beauty
                    </MenuItem>

                    <MenuItem value="Fashion">
                      Fashion
                    </MenuItem>

                    <MenuItem value="Electronics">
                      Electronics
                    </MenuItem>

                    <MenuItem value="Accessories">
                      Accessories
                    </MenuItem>

                    <MenuItem value="Fragrances">
                      Fragrances
                    </MenuItem>
                  </TextField>
                </Grid>

                <Grid
                  size={{
                    xs: 12,
                    md: 6
                  }}
                >
                  <TextField
                    fullWidth
                    label="Rating"
                    name="rating"
                    type="number"
                    value={
                      values.rating
                    }
                    onChange={
                      handleChange
                    }
                    onBlur={
                      handleBlur
                    }
                    error={
                      touched.rating &&
                      Boolean(
                        errors.rating
                      )
                    }
                    helperText={
                      touched.rating &&
                      errors.rating
                    }
                  />
                </Grid>

                <Grid
                  size={{
                    xs: 12
                  }}
                >
                  <TextField
                    fullWidth
                    label="Image URL"
                    name="image"
                    value={values.image}
                    onChange={
                      handleChange
                    }
                    onBlur={
                      handleBlur
                    }
                    error={
                      touched.image &&
                      Boolean(
                        errors.image
                      )
                    }
                    helperText={
                      touched.image &&
                      errors.image
                    }
                  />
                </Grid>

                <Grid
                  size={{
                    xs: 12
                  }}
                >
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    name="description"
                    value={
                      values.description
                    }
                    onChange={
                      handleChange
                    }
                    onBlur={
                      handleBlur
                    }
                    error={
                      touched.description &&
                      Boolean(
                        errors.description
                      )
                    }
                    helperText={
                      touched.description &&
                      errors.description
                    }
                  />
                </Grid>

                <Grid
                  size={{
                    xs: 12
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius:
                        "14px",
                      fontWeight: 700,
                      textTransform:
                        "none",
                      background:
                        "linear-gradient(135deg, #ff416c, #ff4b2b)",

                      "&:hover": {
                        opacity: 0.9
                      }
                    }}
                  >
                    Update Product
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Formik>
      </Card>
    </AdminLayout>
  );
}