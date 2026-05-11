import { Box, Button, Container, Divider, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import CartItem from "../components/CartItem";

import { useCart } from "../context/CartContext";

export default function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
    totalQuantity,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 10 }}>
        <Box
          sx={{
            textAlign: "center",
            p: 5,
            borderRadius: "24px",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
          }}>
          <ShoppingCartIcon
            sx={{
              fontSize: 80,
              color: "#ff416c",
              mb: 2,
            }}
          />

          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 2,
            }}>
            Your Cart is Empty
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#666",
              mb: 4,
            }}>
            Looks like you haven't added anything yet.
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: "30px",
              textTransform: "none",
              fontWeight: "bold",
              background: "linear-gradient(45deg, #ff416c, #ff4b2b)",

              "&:hover": {
                opacity: 0.9,
              },
            }}>
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 4,
        }}>
        Shopping Cart
      </Typography>

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            lg: "2fr 1fr",
          },

          gap: 4,
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </Box>

        <Box
          sx={{
            p: 4,
            borderRadius: "24px",
            height: "fit-content",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
            position: "sticky",
            top: 100,
          }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 3,
            }}>
            Order Summary
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
            }}>
            <Typography variant="body1">Total Items</Typography>

            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
              }}>
              {totalQuantity}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 3,
            }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
              }}>
              Total Price
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#ff416c",
              }}>
              ₹ {totalPrice}
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{
              py: 1.8,
              borderRadius: "16px",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "16px",
              background: "linear-gradient(45deg, #ff416c, #ff4b2b)",

              "&:hover": {
                opacity: 0.9,
              },
            }}>
            Proceed To Checkout
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
