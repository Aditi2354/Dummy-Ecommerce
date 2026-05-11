import { useEffect, useState } from "react";

import { Box, TextField, InputAdornment } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

type ProductSearchProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function ProductSearch({
  search,
  setSearch,
}: ProductSearchProps) {
  const [inputValue, setInputValue] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, setSearch]);

  return (
    <Box
      sx={{
        width: "100%",
      }}>
      <TextField
        fullWidth
        placeholder="Search products..."
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "12px",

          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",

            "& fieldset": {
              borderColor: "#ff416c",
            },

            "&:hover fieldset": {
              borderColor: "#ff4b2b",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#ff416c",
            },
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    color: "#ff416c",
                  }}
                />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
}
