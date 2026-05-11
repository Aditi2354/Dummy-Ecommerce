
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { useFormik } from "formik";

import { loginSchema } from "../schemas/validation";

import type { LoginType } from "../types/authTypes";

import { getUsers } from "../utils/auth";

import { useAuth } from "../context/AuthContext";

import { toast } from "react-toastify";

import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const formik = useFormik<LoginType>({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: loginSchema,

    onSubmit: (values) => {
     
      const admin = {
        name: "Admin",

        email: "admin@gmail.com",

        password: "admin123",

        role: "admin" as const,
      };

     
      if (values.email === admin.email && values.password === admin.password) {
        login(admin);

        toast.success("Admin login successful");

        navigate("/dashboard");

        return;
      }

      
      const users = getUsers();

      const matchedUser = users.find(
        (user) =>
          user.email === values.email && user.password === values.password,
      );

   
      if (!matchedUser) {
        toast.error("Invalid email or password");

        return;
      }

    
      login(matchedUser);

      toast.success("Congratulations! You have successfully logged in");

      navigate("/");
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #ff416c, #ff4b2b)",
      }}>
      <Container maxWidth="md">
        <Paper
          elevation={10}
          sx={{
            display: "flex",
            borderRadius: "25px",
            overflow: "hidden",
            minHeight: "550px",
          }}>
      

          <Box
            sx={{
              flex: 1,
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 4,
            }}>
            <Box sx={{ width: "100%" }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  mb: 4,
                }}>
                Sign In
              </Typography>

              <Box component="form" onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  margin="normal"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />

                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  name="password"
                  margin="normal"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 3,
                    py: 1.5,
                    borderRadius: "30px",
                    fontSize: "16px",
                    textTransform: "none",
                    background: "linear-gradient(to right, #ff416c, #ff4b2b)",
                  }}>
                  Sign In
                </Button>
              </Box>
            </Box>
          </Box>


          <Box
            sx={{
              flex: 1,
              background: "linear-gradient(to right, #ff416c, #ff4b2b)",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: 4,
            }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                mb: 2,
              }}>
              Welcome Back!
            </Typography>

            <Typography
              sx={{
                mb: 4,
              }}>
              Enter your personal details and start your journey with us
            </Typography>

            <Button
              component={Link}
              to="/register"
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                borderRadius: "30px",
                px: 5,
                py: 1,

                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}>
              Sign Up
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
