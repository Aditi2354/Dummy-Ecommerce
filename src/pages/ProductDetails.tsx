import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Grid,
  Rating,
  Typography
} from "@mui/material";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import { useCart } from "../context/CartContext";

import { useProduct } from "../context/ProductContext";

export default function ProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const { products } = useProduct();

  const productId = Number(id);

  const product = products.find(
    (item) => item.id === productId
  );

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
            gap: 2
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700
            }}
          >
            Product Not Found
          </Typography>

          <Button
            variant="contained"
            onClick={() =>
              navigate("/")
            }
            sx={{
              background:
                "linear-gradient(135deg, #ff416c, #ff4b2b)",
              borderRadius: "12px",
              px: 4
            }}
          >
            Back To Home
          </Button>
        </Box>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 5
      }}
    >
      <Card
        sx={{
          p: 4,
          borderRadius: "24px",
          boxShadow: 5
        }}
      >
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            component="div"
            xs={12}
            md={6}
          >
            <Box
              component="img"
              src={product.image}
              alt={product.title}
              sx={{
                width: "100%",
                borderRadius: "20px",
                height: {
                  xs: 300,
                  md: 500
                },
                objectFit: "cover"
              }}
            />
          </Grid>

          <Grid
            item
            component="div"
            xs={12}
            md={6}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700
                }}
              >
                {product.title}
              </Typography>

              <Chip
                label={product.category}
                sx={{
                  width: "fit-content",
                  background:
                    "linear-gradient(135deg, #ff416c, #ff4b2b)",
                  color: "#fff",
                  fontWeight: 700
                }}
              />

              <Box>
                <Rating
                  value={product.rating}
                  precision={0.5}
                  readOnly
                />

                <Typography
                  variant="body2"
                  sx={{
                    mt: 1
                  }}
                >
                  {product.rating} Rating
                </Typography>
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#ff416c"
                }}
              >
                ₹ {product.price}
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  lineHeight: 1.8
                }}
              >
                {product.description}
              </Typography>

              <Button
                variant="contained"
                onClick={
                  handleAddToCart
                }
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: "14px",
                  fontWeight: 700,
                  fontSize: "16px",
                  background:
                    "linear-gradient(135deg, #ff416c, #ff4b2b)",

                  "&:hover": {
                    opacity: 0.9
                  }
                }}
              >
                Add To Cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}