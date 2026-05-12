import {
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Pagination,
  TextField,
  Typography
} from "@mui/material";

import {
  Add,
  Delete,
  Edit
} from "@mui/icons-material";

import {
  useEffect,
  useMemo,
  useState
} from "react";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/admin/AdminLayout";

import { useProduct } from "../../context/ProductContext";

export default function AdminProducts() {
  const navigate = useNavigate();

  const {
    products,
    deleteProduct
  } = useProduct();

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [open, setOpen] =
    useState(false);

  const [selectedId, setSelectedId] =
    useState<number | null>(null);

  const PRODUCTS_PER_PAGE = 8;

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [products, search]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const totalPages = Math.ceil(
    filteredProducts.length /
      PRODUCTS_PER_PAGE
  );

  const startIndex =
    (page - 1) *
    PRODUCTS_PER_PAGE;

  const paginatedProducts =
    filteredProducts.slice(
      startIndex,
      startIndex +
        PRODUCTS_PER_PAGE
    );

  const handleDeleteClick = (
    id: number
  ) => {
    setSelectedId(id);

    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);

    setSelectedId(null);
  };

  const handleDeleteProduct = () => {
    if (selectedId === null) {
      toast.error(
        "Product not found"
      );

      return;
    }

    deleteProduct(selectedId);

    toast.success(
      "Product deleted successfully"
    );

    handleCloseDialog();

    const remainingProducts =
      filteredProducts.length - 1;

    const newTotalPages =
      Math.ceil(
        remainingProducts /
          PRODUCTS_PER_PAGE
      );

    if (
      page > newTotalPages &&
      page > 1
    ) {
      setPage(page - 1);
    }
  };

  return (
    <AdminLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700
          }}
        >
          Products
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() =>
            navigate(
              "/dashboard/products/add"
            )
          }
          sx={{
            borderRadius: "12px",
            px: 3,
            py: 1.2,
            fontWeight: 700,
            textTransform: "none",
            background:
              "linear-gradient(135deg, #ff416c, #ff4b2b)",

            "&:hover": {
              opacity: 0.9
            }
          }}
        >
          Add Product
        </Button>
      </Box>

      <TextField
        fullWidth
        placeholder="Search products..."
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
        sx={{
          mb: 4,

          "& .MuiOutlinedInput-root": {
            borderRadius: "14px",
            background: "#fff"
          }
        }}
      />

      <Grid
        container
        spacing={3}
      >
        {paginatedProducts.map(
          (product) => (
            <Grid
              key={product.id}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3
              }}
            >
              <Card
                sx={{
                  p: 2,
                  borderRadius: "20px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 4
                }}
              >
                <Box
                  sx={{
                    height: 220,
                    display: "flex",
                    justifyContent:
                      "center",
                    alignItems: "center",
                    background:
                      "#f8f8f8",
                    borderRadius: "16px",
                    mb: 2,
                    overflow: "hidden"
                  }}
                >
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit:
                        "contain"
                    }}
                  />
                </Box>

                <Chip
                  label={
                    product.category
                  }
                  sx={{
                    width: "fit-content",
                    mb: 2,
                    background:
                      "linear-gradient(135deg, #ff416c, #ff4b2b)",
                    color: "#fff",
                    fontWeight: 700
                  }}
                />

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1
                  }}
                >
                  {product.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    mb: 2,
                    flexGrow: 1
                  }}
                >
                  {
                    product.description
                  }
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "#ff416c",
                    mb: 2
                  }}
                >
                  ₹{product.price}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      "space-between"
                  }}
                >
                  <IconButton
                    onClick={() =>
                      navigate(
                        `/dashboard/products/edit/${product.id}`
                      )
                    }
                    sx={{
                      background:
                        "#e3f2fd",

                      "&:hover": {
                        background:
                          "#bbdefb"
                      }
                    }}
                  >
                    <Edit />
                  </IconButton>

                  <IconButton
                    onClick={() =>
                      handleDeleteClick(
                        product.id
                      )
                    }
                    sx={{
                      background:
                        "#ffebee",

                      "&:hover": {
                        background:
                          "#ffcdd2"
                      }
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          )
        )}
      </Grid>

      {filteredProducts.length ===
        0 && (
        <Box
          sx={{
            textAlign: "center",
            mt: 8
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 2
            }}
          >
            No Products Found
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#666",
              mb: 3
            }}
          >
            Try adding products or
            searching differently.
          </Typography>

          <Button
            variant="contained"
            onClick={() =>
              navigate(
                "/dashboard/products/add"
              )
            }
            sx={{
              borderRadius: "12px",
              px: 4,
              py: 1.2,
              fontWeight: 700,
              textTransform: "none",
              background:
                "linear-gradient(135deg, #ff416c, #ff4b2b)"
            }}
          >
            Add Product
          </Button>
        </Box>
      )}

      {filteredProducts.length >
        PRODUCTS_PER_PAGE && (
        <Box
          sx={{
            display: "flex",
            justifyContent:
              "center",
            mt: 5
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) =>
              setPage(value)
            }
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root":
                {
                  fontWeight: 700
                },

              "& .Mui-selected": {
                background:
                  "linear-gradient(135deg, #ff416c, #ff4b2b)",
                color: "#fff"
              }
            }}
          />
        </Box>
      )}

      <Dialog
        open={open}
        onClose={
          handleCloseDialog
        }
      >
        <DialogTitle
          sx={{
            fontWeight: 700
          }}
        >
          Delete Product
        </DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want
            to delete this product?
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            p: 2
          }}
        >
          <Button
            onClick={
              handleCloseDialog
            }
            sx={{
              fontWeight: 700
            }}
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={
              handleDeleteProduct
            }
            sx={{
              fontWeight: 700
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}