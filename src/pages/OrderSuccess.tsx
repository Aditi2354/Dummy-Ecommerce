import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8f8f8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}>
      <Container maxWidth="sm">
        <Card
          sx={{
            borderRadius: "28px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
            overflow: "hidden",
          }}>
          <Box
            sx={{
              background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
              py: 5,
              display: "flex",
              justifyContent: "center",
            }}>
            <CheckCircleIcon
              sx={{
                fontSize: 100,
                color: "#fff",
              }}
            />
          </Box>

          <CardContent
            sx={{
              textAlign: "center",
              py: 5,
              px: 4,
            }}>
            <Typography variant="h4" fontWeight={700} mb={2}>
              Order Placed Successfully
            </Typography>

            <Typography variant="body1" color="text.secondary" mb={4}>
              Thank you for shopping with us. Your order has been confirmed and
              will be delivered soon.
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/")}
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: "14px",
                fontSize: "16px",
                fontWeight: 700,
                textTransform: "none",
                background: "linear-gradient(135deg, #ff416c, #ff4b2b)",

                "&:hover": {
                  background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
                },
              }}>
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
