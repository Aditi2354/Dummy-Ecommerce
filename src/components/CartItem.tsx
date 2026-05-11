import { Box, Card, Chip, IconButton, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import RemoveIcon from "@mui/icons-material/Remove";

import DeleteIcon from "@mui/icons-material/Delete";

import type { CartItemType } from "../types/cartTypes";

interface CartItemProps {
  item: CartItemType;

  onIncrease: (id: number) => void;

  onDecrease: (id: number) => void;

  onRemove: (id: number) => void;
}

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: "24px",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
      }}>
      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            md: "160px 1fr",
          },

          gap: 3,

          alignItems: "center",
        }}>
        <Box
          component="img"
          src={item.image}
          alt={item.title}
          sx={{
            width: "100%",
            height: {
              xs: "250px",
              md: "160px",
            },
            objectFit: "cover",
            borderRadius: "18px",
          }}
        />

        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 2,
              flexWrap: "wrap",
            }}>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                }}>
                {item.title}
              </Typography>

              <Chip
                label={item.category}
                sx={{
                  mb: 2,
                  background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              />

              <Typography
                variant="h6"
                sx={{
                  color: "#ff416c",
                  fontWeight: "bold",
                }}>
                ₹ {item.price}
              </Typography>
            </Box>

            <IconButton
              onClick={() => onRemove(item.id)}
              sx={{
                backgroundColor: "#ffe5ea",

                "&:hover": {
                  backgroundColor: "#ffd6de",
                },
              }}>
              <DeleteIcon
                sx={{
                  color: "#ff416c",
                }}
              />
            </IconButton>
          </Box>

          <Box
            sx={{
              mt: 3,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}>
            <IconButton
              onClick={() => onDecrease(item.id)}
              sx={{
                background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
                color: "#fff",

                "&:hover": {
                  opacity: 0.9,
                },
              }}>
              <RemoveIcon />
            </IconButton>

            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                minWidth: "30px",
                textAlign: "center",
              }}>
              {item.quantity}
            </Typography>

            <IconButton
              onClick={() => onIncrease(item.id)}
              sx={{
                background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
                color: "#fff",

                "&:hover": {
                  opacity: 0.9,
                },
              }}>
              <AddIcon />
            </IconButton>
          </Box>

          <Typography
            variant="body1"
            sx={{
              mt: 3,
              fontWeight: "bold",
            }}>
            Total: ₹ {item.price * item.quantity}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
