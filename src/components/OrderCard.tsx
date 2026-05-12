import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import type { OrderType } from "../types/orderTypes";

interface OrderCardProps {
  order: OrderType;
}

export default function OrderCard({
  order,
}: OrderCardProps) {
  const getOrderStatus = () => {
    const orderDate = new Date(
      order.createdAt
    ).getTime();

    const currentDate =
      new Date().getTime();

    const difference =
      currentDate - orderDate;

    const days =
      difference /
      (1000 * 60 * 60 * 24);

    return days > 3
      ? "Delivered"
      : "Processing";
  };

  const status = getOrderStatus();

  return (
    <Card
      sx={{
        borderRadius: 4,
        mb: 3,
        boxShadow:
          "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <CardContent>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          justifyContent="space-between"
          spacing={2}
          sx={{
            mb: 3,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 1,
              }}
            >
              Order #{order.id}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "gray",
              }}
            >
              {new Date(
                order.createdAt
              ).toLocaleDateString()}
            </Typography>
          </Box>

          <Chip
            label={status}
            color={
              status === "Delivered"
                ? "success"
                : "warning"
            }
            sx={{
              fontWeight: 700,
              width: "fit-content",
            }}
          />
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          Ordered Products
        </Typography>

        <Stack spacing={2}>
         {(order.products || []).map((product) => (
            <Box
              key={product.id}
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
                border: "1px solid #eee",
                borderRadius: 3,
                p: 2,
              }}
            >
              <Box
                component="img"
                src={product.thumbnail}
                alt={product.title}
                sx={{
                  width: 90,
                  height: 90,
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />

              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  {product.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "gray",
                    mb: 1,
                  }}
                >
                  Quantity: {product.quantity}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 700,
                    color: "#ff416c",
                  }}
                >
                  ₹{product.price}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Stack
          spacing={1}
          sx={{
            mb: 3,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
            }}
          >
            Total Quantity:{" "}
            {order.totalQuantity}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
            }}
          >
            Total Price: ₹
            {order.totalPrice}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
            }}
          >
            Payment Method:{" "}
            {order.paymentMethod}
          </Typography>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          Shipping Details
        </Typography>

        <Stack spacing={1}>
          <Typography>
            {
              order.shippingDetails
                .fullName
            }
          </Typography>

          <Typography>
            {
              order.shippingDetails
                .address
            }
          </Typography>

          <Typography>
            {
              order.shippingDetails
                .city
            }
            ,{" "}
            {
              order.shippingDetails
                .state
            }{" "}
            -{" "}
            {
              order.shippingDetails
                .pincode
            }
          </Typography>

          <Typography>
            {
              order.shippingDetails
                .phone
            }
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}