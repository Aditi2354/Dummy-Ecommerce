import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";

import { products } from "../data/product";

import type { ProductType } from "../types/productTypes";

import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const productId = Number(id);

  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
            }}>
            Product Not Found
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{
              background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
              borderRadius: "12px",
              px: 4,
            }}>
            Back To Home
          </Button>
        </Box>
      </Container>
    );
  }

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

    const alreadyExists = existingCart.find(
      (item: ProductType) => item.id === product.id,
    );

    if (alreadyExists) {
      toast.info("Product already in cart");
      return;
    }

    existingCart.push(product);

    localStorage.setItem("cartItems", JSON.stringify(existingCart));

    toast.success("Product added to cart");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Card
        sx={{
          p: 4,
          borderRadius: "24px",
          boxShadow: 5,
        }}>
        <Grid container spacing={4}>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}>
            <Box
              component="img"
              src={product.image}
              alt={product.title}
              sx={{
                width: "100%",
                borderRadius: "20px",
                height: {
                  xs: 300,
                  md: 500,
                },
                objectFit: "cover",
              }}
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                }}>
                {product.title}
              </Typography>

              <Chip
                label={product.category}
                sx={{
                  width: "fit-content",
                  background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
                  color: "white",
                  fontWeight: "bold",
                }}
              />

              <Box>
                <Rating value={product.rating} precision={0.5} readOnly />

                <Typography variant="body2">{product.rating} Rating</Typography>
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "#ff416c",
                }}>
                ₹ {product.price}
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  lineHeight: 1.8,
                }}>
                {product.description}
              </Typography>

              <Button
                variant="contained"
                onClick={handleAddToCart}
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: "14px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  background: "linear-gradient(135deg, #ff416c, #ff4b2b)",

                  "&:hover": {
                    opacity: 0.9,
                  },
                }}>
                Add To Cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
