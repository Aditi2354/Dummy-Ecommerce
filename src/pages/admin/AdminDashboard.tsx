import {
  Box,
  Card,
  Grid,
  Typography
} from "@mui/material";

import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 4
        }}
      >
        Dashboard
      </Typography>

      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          component="div"
          xs={12}
          sm={6}
          md={4}
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
              Total Products
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#ff416c"
              }}
            >
              0
            </Typography>
          </Card>
        </Grid>

        <Grid
          item
          component="div"
          xs={12}
          sm={6}
          md={4}
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
              0
            </Typography>
          </Card>
        </Grid>

        <Grid
          item
          component="div"
          xs={12}
          sm={6}
          md={4}
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
              ₹0
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
}