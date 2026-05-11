import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Chip,
  Badge,
  IconButton,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useAuth } from "../context/AuthContext";

import { useCart } from "../context/CartContext";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

export default function Navbar() {
  const { user, logout } = useAuth();

  const { totalQuantity } = useCart();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    toast.success("Logout successful");

    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(to right, #ff416c, #ff4b2b)",
        boxShadow: 4,
      }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: 1,
          gap: 2,
        }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            letterSpacing: 1,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}>
          My Ecommerce
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}>
          <Typography
            sx={{
              fontWeight: "500",
            }}>
            Welcome {user?.name}
          </Typography>

          {user?.role === "admin" && (
            <Chip
              label="Admin"
              sx={{
                backgroundColor: "white",
                color: "#ff416c",
                fontWeight: "bold",
              }}
            />
          )}

          <IconButton
            onClick={() => navigate("/cart")}
            sx={{
              color: "#fff",
            }}>
            <Badge badgeContent={totalQuantity} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
              backgroundColor: "white",
              color: "#ff416c",
              borderRadius: "25px",
              px: 3,
              textTransform: "none",
              fontWeight: "bold",

              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
