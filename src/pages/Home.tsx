// import {
//   Box,
//   Typography
// } from "@mui/material";

// import Navbar from "../components/Navbar";

// export default function Home() {

//   return (

//     <>

//       <Navbar />

//       <Box p={4}>

//         <Typography variant="h3">

//           Welcome User

//         </Typography>

//       </Box>

//     </>
//   );
// }
import { useMemo, useState } from "react";

import { Box, Container, Grid, Typography } from "@mui/material";

import Navbar from "../components/Navbar";

import ProductCard from "../components/ProductCard";
import ProductSearch from "../components/ProductSearch";
import ProductFilters from "../components/ProductFilters";
import ProductPagination from "../components/ProductPagination";

import { products } from "../data/product";

export default function Home() {
  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [priceFilter, setPriceFilter] = useState("All");

  const [page, setPage] = useState(1);

  const PRODUCTS_PER_PAGE = 8;

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      
      const matchesCategory =
        category === "All" || product.category === category;

    
      let matchesPrice = true;

      if (priceFilter === "under1000") {
        matchesPrice = product.price < 1000;
      }

      if (priceFilter === "1000to3000") {
        matchesPrice = product.price >= 1000 && product.price <= 3000;
      }

      if (priceFilter === "above3000") {
        matchesPrice = product.price > 3000;
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [search, category, priceFilter]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const startIndex = (page - 1) * PRODUCTS_PER_PAGE;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to right, #fff5f7, #ffeaea)",
          py: 4,
        }}>
        <Container maxWidth="xl">
        
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: 4,
              background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            Explore Products
          </Typography>

          <Box
            sx={{
              mb: 3,
            }}>
            <ProductSearch search={search} setSearch={setSearch} />
          </Box>

          <Box
            sx={{
              mb: 4,
            }}>
            <ProductFilters
              category={category}
              setCategory={setCategory}
              priceFilter={priceFilter}
              setPriceFilter={setPriceFilter}
            />
          </Box>

          <Grid container spacing={3}>
            {paginatedProducts.map((product) => (
              <Grid
                key={product.id}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                  lg: 3,
                }}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>

          {paginatedProducts.length === 0 && (
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                mt: 6,
                color: "#666",
              }}>
              No products found.
            </Typography>
          )}

          {filteredProducts.length > PRODUCTS_PER_PAGE && (
            <ProductPagination
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          )}
        </Container>
      </Box>
    </>
  );
}
