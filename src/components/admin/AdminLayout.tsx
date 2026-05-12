import {
  Box,
  Grid
} from "@mui/material";

import type { ReactNode } from "react";

import Navbar from "../Navbar";

import AdminSidebar from "./AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children
}: AdminLayoutProps) {
  return (
    <>
      <Navbar />

      <Box
        sx={{
          background:
            "linear-gradient(to right, #fff5f7, #ffeaea)",
          minHeight: "100vh"
        }}
      >
        <Grid container>
          <Grid
            size={{
              xs: 12,
              md: 3,
              lg: 2.5
            }}
          >
            <AdminSidebar />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 9,
              lg: 9.5
            }}
          >
            <Box
              sx={{
                p: 4
              }}
            >
              {children}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}