import {
  Box,
  Card,
  Chip,
  Grid,
  MenuItem,
  TextField,
  Typography
} from "@mui/material";

import {
  useEffect,
  useMemo,
  useState
} from "react";

import { toast } from "react-toastify";

import AdminLayout from "../../components/admin/AdminLayout";

import type { OrderType } from "../../types/orderTypes";

export default function AdminOrders() {
  const [orders, setOrders] =
    useState<OrderType[]>([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    const storedOrders =
      localStorage.getItem(
        "orders"
      );

    if (storedOrders) {
      const parsedOrders =
        JSON.parse(storedOrders);

      setOrders(
        Array.isArray(
          parsedOrders
        )
          ? parsedOrders.reverse()
          : []
      );
    }
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) =>
      order.shippingDetails.fullName
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [orders, search]);

  const totalRevenue =
    filteredOrders.reduce(
      (total, order) =>
        total + order.totalPrice,
      0
    );

  const handleStatusChange = (
    orderId: number,
    status: string
  ) => {
    const updatedOrders =
      orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status
            }
          : order
      );

    setOrders(updatedOrders);

    localStorage.setItem(
      "orders",
      JSON.stringify(
        [...updatedOrders].reverse()
      )
    );

    toast.success(
      "Order status updated"
    );
  };

  return (
    <AdminLayout>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 4
        }}
      >
        Orders Management
      </Typography>

      <Grid
        container
        spacing={3}
        sx={{
          mb: 4
        }}
      >
        <Grid
          size={{
            xs: 12,
            md: 4
          }}
        >
          <Card
            sx={{
              p: 3,
              borderRadius: "20px",
              boxShadow: 4
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2
              }}
            >
              Total Orders
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#ff416c"
              }}
            >
              {
                filteredOrders.length
              }
            </Typography>
          </Card>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 4
          }}
        >
          <Card
            sx={{
              p: 3,
              borderRadius: "20px",
              boxShadow: 4
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2
              }}
            >
              Revenue
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#ff416c"
              }}
            >
              ₹{totalRevenue}
            </Typography>
          </Card>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 4
          }}
        >
          <Card
            sx={{
              p: 3,
              borderRadius: "20px",
              boxShadow: 4
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2
              }}
            >
              Delivered
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#ff416c"
              }}
            >
              {
                filteredOrders.filter(
                  (order) =>
                    order.status ===
                    "Delivered"
                ).length
              }
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <TextField
        fullWidth
        placeholder="Search by customer name..."
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
        sx={{
          mb: 4,

          "& .MuiOutlinedInput-root": {
            borderRadius: "14px",
            background: "#fff"
          }
        }}
      />

      <Grid
        container
        spacing={3}
      >
        {filteredOrders.map(
          (order) => (
            <Grid
              key={order.id}
              size={{
                xs: 12
              }}
            >
              <Card
                sx={{
                  p: 3,
                  borderRadius: "24px",
                  boxShadow: 4
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                    mb: 3
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700
                      }}
                    >
                      {
                        order.shippingDetails
                          .fullName
                      }
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "#666"
                      }}
                    >
                      {
                        order.shippingDetails
                          .email
                      }
                    </Typography>
                  </Box>

                  <Chip
                    label={
                      order.status ||
                      "Processing"
                    }
                    sx={{
                      background:
                        order.status ===
                        "Delivered"
                          ? "#4caf50"
                          : order.status ===
                              "Cancelled"
                            ? "#f44336"
                            : "#ff9800",

                      color: "#fff",
                      fontWeight: 700
                    }}
                  />
                </Box>

                <Grid
                  container
                  spacing={2}
                >
                  {(order.products ||
                    []).map(
                    (product) => (
                      <Grid
                        key={
                          product.id
                        }
                        size={{
                          xs: 12,
                          md: 6
                        }}
                      >
                        <Card
                          sx={{
                            p: 2,
                            display: "flex",
                            gap: 2,
                            alignItems:
                              "center",
                            borderRadius:
                              "16px",
                            boxShadow: 2
                          }}
                        >
                          <Box
                            component="img"
                            src={
                              product.image
                            }
                            alt={
                              product.title
                            }
                            sx={{
                              width: 80,
                              height: 80,
                              borderRadius:
                                "12px",
                              objectFit:
                                "cover"
                            }}
                          />

                          <Box>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 700
                              }}
                            >
                              {
                                product.title
                              }
                            </Typography>

                            <Typography
                              variant="body2"
                            >
                              Qty:{" "}
                              {
                                product.quantity
                              }
                            </Typography>

                            <Typography
                              variant="body2"
                            >
                              ₹
                              {
                                product.price
                              }
                            </Typography>
                          </Box>
                        </Card>
                      </Grid>
                    )
                  )}
                </Grid>

                <Box
                  sx={{
                    mt: 3,
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2
                  }}
                >
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 700
                      }}
                    >
                      Total Quantity:{" "}
                      {
                        order.totalQuantity
                      }
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color:
                          "#ff416c"
                      }}
                    >
                      ₹
                      {
                        order.totalPrice
                      }
                    </Typography>
                  </Box>

                  <TextField
                    select
                    label="Update Status"
                    value={
                      order.status ||
                      "Processing"
                    }
                    onChange={(
                      event
                    ) =>
                      handleStatusChange(
                        order.id,
                        event.target
                          .value
                      )
                    }
                    sx={{
                      minWidth: 200,

                      "& .MuiOutlinedInput-root":
                        {
                          borderRadius:
                            "12px",
                          background:
                            "#fff"
                        }
                    }}
                  >
                    <MenuItem value="Processing">
                      Processing
                    </MenuItem>

                    <MenuItem value="Delivered">
                      Delivered
                    </MenuItem>

                    <MenuItem value="Cancelled">
                      Cancelled
                    </MenuItem>
                  </TextField>
                </Box>
              </Card>
            </Grid>
          )
        )}
      </Grid>

      {filteredOrders.length ===
        0 && (
        <Box
          sx={{
            textAlign: "center",
            mt: 8
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 2
            }}
          >
            No Orders Found
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#666"
            }}
          >
            Orders will appear here.
          </Typography>
        </Box>
      )}
    </AdminLayout>
  );
}