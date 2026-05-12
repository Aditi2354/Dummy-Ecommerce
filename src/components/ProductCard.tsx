import {
  Box,
  Button,
  Card,
  Chip,
  Rating,
  Typography
} from "@mui/material";

import { useNavigate } from "react-router-dom";

// import type{ ProductType } from "../types/productTypes";
import type { Product } from "../types/productTypes";
import { useCart } from "../context/CartContext";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product
}: ProductCardProps) {
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const handleAddToCart = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();

    addToCart(product);
  };

  return (
    <Card
      onClick={() =>
        navigate(`/product/${product.id}`)
      }
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "24px",
        overflow: "hidden",
        cursor: "pointer",
        background: "#fff",
        boxShadow:
          "0px 4px 20px rgba(0,0,0,0.1)",
        transition: "0.3s",

        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow:
            "0px 10px 25px rgba(0,0,0,0.2)"
        }
      }}
    >
      <Box
        sx={{
          height: 260,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f8f8f8",
          p: 2
        }}
      >
        <Box
          component="img"
          src={product.image}
          alt={product.title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain"
          }}
        />
      </Box>

      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1
        }}
      >
        <Chip
          label={product.category}
          sx={{
            width: "fit-content",
            mb: 2,
            background:
              "linear-gradient(45deg, #ff416c, #ff4b2b)",
            color: "#fff",
            fontWeight: 700
          }}
        />

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 1,
            minHeight: 64
          }}
        >
          {product.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#666",
            mb: 2,
            minHeight: 48,
            lineHeight: 1.7
          }}
        >
          {product.description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 3
          }}
        >
          <Rating
            value={product.rating}
            precision={0.5}
            readOnly
          />

          <Typography
            variant="body2"
            sx={{
              fontWeight: 700
            }}
          >
            {product.rating}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            gap: 2,
            mt: "auto"
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#ff416c",
              fontWeight: 700
            }}
          >
            ₹{product.price}
          </Typography>

          <Button
            variant="contained"
            onClick={handleAddToCart}
            sx={{
              borderRadius: "30px",
              textTransform: "none",
              fontWeight: 700,
              px: 3,
              py: 1,
              background:
                "linear-gradient(45deg, #ff416c, #ff4b2b)",

              "&:hover": {
                background:
                  "linear-gradient(45deg, #ff4b2b, #ff416c)"
              }
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Card>
  );
}