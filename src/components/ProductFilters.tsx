import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

type ProductFiltersProps = {
  category: string;
  setCategory: React.Dispatch<
    React.SetStateAction<string>
  >;

  priceFilter: string;
  setPriceFilter: React.Dispatch<
    React.SetStateAction<string>
  >;
};

export default function ProductFilters({
  category,
  setCategory,
  priceFilter,
  setPriceFilter,
}: ProductFiltersProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        width: "100%",
      }}
    >
     
      <FormControl
        fullWidth
        sx={{
          flex: 1,
          minWidth: "220px",
        }}
      >
        <InputLabel>
          Category
        </InputLabel>

        <Select
          value={category}
          label="Category"
          onChange={(event) =>
            setCategory(event.target.value)
          }
          sx={{
            borderRadius: "12px",

            "& .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#ff416c",
              },

            "&:hover .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#ff4b2b",
              },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#ff416c",
              },
          }}
        >
          <MenuItem value="All">
            All
          </MenuItem>

          <MenuItem value="Beauty">
            Beauty
          </MenuItem>

          <MenuItem value="Fashion">
            Fashion
          </MenuItem>

          <MenuItem value="Electronics">
            Electronics
          </MenuItem>

          <MenuItem value="Accessories">
            Accessories
          </MenuItem>

          <MenuItem value="Fragrances">
            Fragrances
          </MenuItem>
        </Select>
      </FormControl>

     
      <FormControl
        fullWidth
        sx={{
          flex: 1,
          minWidth: "220px",
        }}
      >
        <InputLabel>
          Price
        </InputLabel>

        <Select
          value={priceFilter}
          label="Price"
          onChange={(event) =>
            setPriceFilter(event.target.value)
          }
          sx={{
            borderRadius: "12px",

            "& .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#ff416c",
              },

            "&:hover .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#ff4b2b",
              },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#ff416c",
              },
          }}
        >
          <MenuItem value="All">
            All Prices
          </MenuItem>

          <MenuItem value="under1000">
            Under ₹1000
          </MenuItem>

          <MenuItem value="1000to3000">
            ₹1000 - ₹3000
          </MenuItem>

          <MenuItem value="above3000">
            Above ₹3000
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}