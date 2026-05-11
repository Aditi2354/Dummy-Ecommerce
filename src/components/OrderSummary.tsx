import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { useCart } from "../context/CartContext";

export default function OrderSummary() {
  const { cartItems, totalPrice, totalQuantity } = useCart();

  return (
    <Card
      sx={{
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 100,
      }}>
      <CardContent>
        <Typography
          variant="h5"
          fontWeight={700}
          mb={3}
          sx={{
            background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
          Order Summary
        </Typography>

        <Stack spacing={3}>
          {cartItems.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}>
              <Box
                component="img"
                src={item.image}
                alt={item.title}
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: "12px",
                  objectFit: "cover",
                  backgroundColor: "#f5f5f5",
                  p: 1,
                }}
              />

              <Box sx={{ flex: 1 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                    {item.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Qty: {item.quantity}
                  </Typography>

                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{
                      color: "#ff416c",
                    }}>
                    ₹{item.price * item.quantity}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Stack>

        <Divider
          sx={{
            my: 3,
          }}
        />

        <Stack spacing={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}>
            <Typography variant="body1">Total Items</Typography>

            <Typography fontWeight={600}>{totalQuantity}</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}>
            <Typography variant="h6" fontWeight={700}>
              Total Price
            </Typography>

            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                color: "#ff416c",
              }}>
              ₹{totalPrice}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
