import {
  Box,
  Typography
} from "@mui/material";

import Navbar from "../components/Navbar";

export default function Dashboard() {

  return (

    <>

      <Navbar />

      <Box p={4}>

        <Typography variant="h3">

          Welcome Admin 

        </Typography>

      </Box>

    </>
  );
}