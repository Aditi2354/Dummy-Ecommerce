
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Chip
} from "@mui/material";

import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

export default function Navbar() {

  const { user, logout } = useAuth();

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
        background:
          "linear-gradient(to right, #ff416c, #ff4b2b)",
        boxShadow: 4
      }}
    >

      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: 1
        }}
      >


        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            letterSpacing: 1
          }}
        >
          My Ecommerce
        </Typography>

    
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2
          }}
        >

          {/* <Avatar
            sx={{
              backgroundColor: "white",
              color: "#ff416c",
              fontWeight: "bold"
            }}
          >
            {user?.name?.charAt(0)}
          </Avatar> */}
       
          <Typography
            sx={{
              fontWeight: "500"
            }}
          >
            Welcome,
            {" "}
            {user?.name}
          </Typography>


          {/* {
            user?.role === "admin" && (

              <Chip
                label="Admin"
                sx={{
                  backgroundColor: "white",
                  color: "#ff416c",
                  fontWeight: "bold"
                }}
              />
            )
          } */}


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
                backgroundColor: "#f5f5f5"
              }
            }}
          >
            Logout
          </Button>

        </Box>

      </Toolbar>

    </AppBar>
  );
}