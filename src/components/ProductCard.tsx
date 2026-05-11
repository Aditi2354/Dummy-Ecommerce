import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import type { ProductType } from "../types/productTypes";

type ProductCardProps = {
  product: ProductType;
};

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    const existingCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

    const alreadyExists = existingCart.find(
      (item: ProductType) => item.id === product.id,
    );

    if (alreadyExists) {
      return;
    }

    existingCart.push(product);

    localStorage.setItem("cartItems", JSON.stringify(existingCart));
  };

  return (
    <Card
      onClick={() => navigate(`/product/${product.id}`)}
      sx={{
        height: "100%",
        borderRadius: "20px",
        overflow: "hidden",
        transition: "0.3s",
        cursor: "pointer",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",

        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
        },
      }}>
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
        sx={{
          height: "220px",
          objectFit: "cover",
        }}
      />

      <CardContent>
        <Chip
          label={product.category}
          sx={{
            mb: 2,
            background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
            color: "#fff",
            fontWeight: "bold",
          }}
        />

        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 1,
          }}>
          {product.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#666",
            mb: 2,
            minHeight: "40px",
          }}>
          {product.description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
          }}>
          <Rating value={product.rating} precision={0.5} readOnly />

          <Typography
            variant="body2"
            sx={{
              ml: 1,
              fontWeight: "bold",
            }}>
            {product.rating}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
          }}>
          <Typography
            variant="h6"
            sx={{
              color: "#ff416c",
              fontWeight: "bold",
            }}>
            ₹{product.price}
          </Typography>

          <Button
            variant="contained"
            onClick={handleAddToCart}
            sx={{
              borderRadius: "30px",
              textTransform: "none",
              fontWeight: "bold",
              background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
              px: 3,

              "&:hover": {
                background: "linear-gradient(45deg, #ff4b2b, #ff416c)",
              },
            }}>
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
