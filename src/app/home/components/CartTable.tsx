import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { CartItem } from "@luz-catalogue/app/home/types";

type Props = {
  items: CartItem[];
  onRemove: (id: string) => void;
  onQuantityChange: (item: CartItem, delta: number) => void;
};

export const CartTable = ({ items, onQuantityChange, onRemove }: Props) => {
  return (
    <TableContainer component={Paper} elevation={1}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Code</strong>
            </TableCell>
            <TableCell>
              <strong>Description</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Available</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Quantity</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {items.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography variant="body2" color="text.secondary">
                  List is empty
                </Typography>
              </TableCell>
            </TableRow>
          )}

          {items.map((item, index) => (
            <TableRow key={`search-item-${index}`}>
              <TableCell>{item.code}</TableCell>

              <TableCell>
                <Typography variant="body2">{item.description}</Typography>
              </TableCell>

              <TableCell>{item.stock}</TableCell>

              <TableCell align="center">
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconButton
                    size="small"
                    onClick={() => onQuantityChange(item, -1)}
                    disabled={item.stock <= 1}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>

                  <Typography minWidth={20} textAlign="center">
                    {item.quantity}
                  </Typography>

                  <IconButton
                    size="small"
                    onClick={() => onQuantityChange(item, +1)}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </TableCell>

              <TableCell align="right">
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => onRemove(item.code)}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
