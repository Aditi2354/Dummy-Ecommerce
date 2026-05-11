import { useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import { Formik } from "formik";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import OrderSummary from "../components/OrderSummary";

import { useCart } from "../context/CartContext";

import { checkoutValidationSchema } from "../schemas/checkoutValidation";

import type {
  OrderType,
  ShippingAddressType,
} from "../types/orderTypes";

export default function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    totalPrice,
    totalQuantity,
    clearCart,
  } = useCart();

  const [paymentMethod, setPaymentMethod] =
    useState("Cash On Delivery");

  const initialValues: ShippingAddressType = {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  };

  function handlePlaceOrder(
    values: ShippingAddressType,
  ) {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");

      return;
    }

    const existingOrders: OrderType[] = JSON.parse(
      localStorage.getItem("orders") || "[]",
    );

    const newOrder: OrderType = {
      id: Date.now(),
      items: cartItems,
      totalPrice,
      totalQuantity,
      shippingDetails: values,
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "orders",
      JSON.stringify([
        ...existingOrders,
        newOrder,
      ]),
    );

    clearCart();

    toast.success("Order placed successfully");

    navigate("/order-success");
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8f8f8",
        py: 5,
      }}>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          fontWeight={700}
          mb={4}
          sx={{
            textAlign: "center",
            background:
              "linear-gradient(135deg, #ff416c, #ff4b2b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
          Checkout
        </Typography>

        <Grid
          container
          spacing={4}>
          <Grid
            item
            xs={12}
            md={7}>
            <Card
              sx={{
                borderRadius: "24px",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.1)",
              }}>
              <CardContent
                sx={{
                  p: 4,
                }}>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  mb={4}>
                  Shipping Address
                </Typography>

                <Formik
                  initialValues={initialValues}
                  validationSchema={
                    checkoutValidationSchema
                  }
                  onSubmit={handlePlaceOrder}>
                  {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                  }) => (
                    <Box
                      component="form"
                      onSubmit={handleSubmit}>
                      <Grid
                        container
                        spacing={3}>
                        <Grid
                          item
                          xs={12}>
                          <TextField
                            fullWidth
                            name="fullName"
                            label="Full Name"
                            value={values.fullName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.fullName &&
                              Boolean(
                                errors.fullName,
                              )
                            }
                            helperText={
                              touched.fullName &&
                              errors.fullName
                            }
                          />
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sm={6}>
                          <TextField
                            fullWidth
                            name="email"
                            label="Email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.email &&
                              Boolean(errors.email)
                            }
                            helperText={
                              touched.email &&
                              errors.email
                            }
                          />
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sm={6}>
                          <TextField
                            fullWidth
                            name="phone"
                            label="Phone Number"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.phone &&
                              Boolean(errors.phone)
                            }
                            helperText={
                              touched.phone &&
                              errors.phone
                            }
                          />
                        </Grid>

                        <Grid
                          item
                          xs={12}>
                          <TextField
                            fullWidth
                            multiline
                            rows={4}
                            name="address"
                            label="Address"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.address &&
                              Boolean(
                                errors.address,
                              )
                            }
                            helperText={
                              touched.address &&
                              errors.address
                            }
                          />
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sm={4}>
                          <TextField
                            fullWidth
                            name="city"
                            label="City"
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.city &&
                              Boolean(errors.city)
                            }
                            helperText={
                              touched.city &&
                              errors.city
                            }
                          />
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sm={4}>
                          <TextField
                            fullWidth
                            name="state"
                            label="State"
                            value={values.state}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.state &&
                              Boolean(errors.state)
                            }
                            helperText={
                              touched.state &&
                              errors.state
                            }
                          />
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sm={4}>
                          <TextField
                            fullWidth
                            name="pincode"
                            label="Pincode"
                            value={values.pincode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.pincode &&
                              Boolean(
                                errors.pincode,
                              )
                            }
                            helperText={
                              touched.pincode &&
                              errors.pincode
                            }
                          />
                        </Grid>
                      </Grid>

                      <Box
                        sx={{
                          mt: 5,
                        }}>
                        <Typography
                          variant="h6"
                          fontWeight={700}
                          mb={2}>
                          Payment Method
                        </Typography>

                        <RadioGroup
                          value={paymentMethod}
                          onChange={(event) =>
                            setPaymentMethod(
                              event.target.value,
                            )
                          }>
                          <FormControlLabel
                            value="Cash On Delivery"
                            control={<Radio />}
                            label="Cash On Delivery"
                          />

                          <FormControlLabel
                            value="UPI"
                            control={<Radio />}
                            label="UPI"
                          />

                          <FormControlLabel
                            value="Card Payment"
                            control={<Radio />}
                            label="Card Payment"
                          />
                        </RadioGroup>
                      </Box>

                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{
                          mt: 5,
                          py: 1.5,
                          borderRadius: "14px",
                          fontSize: "16px",
                          fontWeight: 700,
                          textTransform: "none",
                          background:
                            "linear-gradient(135deg, #ff416c, #ff4b2b)",

                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #ff416c, #ff4b2b)",
                          },
                        }}>
                        Pay Now
                      </Button>
                    </Box>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            md={5}>
            <OrderSummary />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}