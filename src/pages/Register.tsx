import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { useFormik } from "formik";

import { registerSchema } from "../schemas/validation";

import { getUsers, saveUsers } from "../utils/auth";

import type { UserType } from "../types/authTypes";

import { toast } from "react-toastify";

import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validationSchema: registerSchema,

    onSubmit: (values) => {
      const users = getUsers();

      const userExists = users.find((user) => user.email === values.email);

      if (userExists) {
        toast.error("User already exists");

        return;
      }

      const newUser: UserType = {
        name: values.name,

        email: values.email,

        password: values.password,

        role: "user",
      };

      saveUsers([...users, newUser]);

      toast.success("Registration successful");

      navigate("/login");
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
              Welcome to Our App!
            </Typography>

            <Typography
              sx={{
                mb: 4,
              }}>
              Already have an account? Login and continue your shopping journey
            </Typography>

            <Button
              component={Link}
              to="/login"
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
              Sign In
            </Button>
          </Box>

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
                Create Account
              </Typography>

              <Box component="form" onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  margin="normal"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />

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
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
