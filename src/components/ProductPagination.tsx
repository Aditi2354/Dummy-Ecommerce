import { Box, Pagination } from "@mui/material";

type ProductPaginationProps = {
  page: number;

  setPage: React.Dispatch<
    React.SetStateAction<number>
  >;

  totalPages: number;
};

export default function ProductPagination({
  page,
  setPage,
  totalPages,
}: ProductPaginationProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 4,
        mb: 4,
      }}
    >
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) =>
          setPage(value)
        }
        shape="rounded"
        size="large"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#ff416c",
            fontWeight: "bold",
            borderColor: "#ff416c",
          },

          "& .Mui-selected": {
            background:
              "linear-gradient(45deg, #ff416c, #ff4b2b)",
            color: "#fff",
          },

          "& .Mui-selected:hover": {
            background:
              "linear-gradient(45deg, #ff4b2b, #ff416c)",
          },
        }}
      />
    </Box>
  );
}