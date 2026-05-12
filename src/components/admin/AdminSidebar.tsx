import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography
} from "@mui/material";

import {
  Dashboard,
  Inventory2,
  ShoppingCart
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <Dashboard />
  },
  {
    label: "Products",
    path: "/dashboard/products",
    icon: <Inventory2 />
  },
  {
    label: "Orders",
    path: "/dashboard/orders",
    icon: <ShoppingCart />
  }
];

export default function AdminSidebar() {
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          md: 260
        },
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #ff416c, #ff4b2b)",
        color: "#fff",
        p: 3
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 4
        }}
      >
        Admin Panel
      </Typography>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            onClick={() =>
              navigate(item.path)
            }
            sx={{
              mb: 2,
              borderRadius: "14px",
              background:
                location.pathname ===
                item.path
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",

              "&:hover": {
                background:
                  "rgba(255,255,255,0.15)"
              }
            }}
          >
            <Box
              sx={{
                mr: 2,
                display: "flex",
                alignItems: "center"
              }}
            >
              {item.icon}
            </Box>

            <ListItemText
              primary={item.label}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}