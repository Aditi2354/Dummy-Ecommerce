import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import OrderCard from "../components/OrderCard";

import type { OrderType } from "../types/orderTypes";

export default function Orders() {
  const [orders, setOrders] = useState<
    OrderType[]
  >([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedOrders =
      localStorage.getItem("orders");

    if (storedOrders) {
      setOrders(
        JSON.parse(storedOrders)
      );
    }
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 5,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 1,
          background:
            "linear-gradient(to right, #ff416c, #ff4b2b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor:
            "transparent",
        }}
      >
        My Orders
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "gray",
          mb: 4,
        }}
      >
        Track your previous purchases
      </Typography>

      {orders.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            mt: 10,
          }}
        >
          <ShoppingBagIcon
            sx={{
              fontSize: 100,
              color: "#ff416c",
              mb: 2,
            }}
          />

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            No Orders Found
          </Typography>

          <Button
            variant="contained"
            onClick={() =>
              navigate("/")
            }
            sx={{
              background:
                "linear-gradient(to right, #ff416c, #ff4b2b)",
              borderRadius: 3,
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        orders
          .slice()
          .reverse()
          .map((order) => (
            <OrderCard
              key={order.id}
              order={order}
            />
          ))
      )}
    </Container>
  );
}