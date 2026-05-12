import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Chip,
  Badge,
  IconButton,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

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
          flexWrap: "wrap",
        }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
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
              fontWeight: 500,
            }}>
            Welcome {user?.name}
          </Typography>

          {user?.role === "admin" && (
            <Chip
              label="Admin"
              sx={{
                backgroundColor: "white",
                color: "#ff416c",
                fontWeight: 700,
              }}
            />
          )}

          <Button
            startIcon={<ReceiptLongIcon />}
            onClick={() => navigate("/orders")}
            sx={{
              color: "white",
              textTransform: "none",
              fontWeight: 700,
              border: "1px solid white",
              borderRadius: "25px",
              px: 2,

              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}>
            My Orders
          </Button>

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
              fontWeight: 700,

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
