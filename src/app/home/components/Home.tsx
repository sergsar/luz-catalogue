"use client";

import { Box } from "@mui/material";
import AutocompleteSearch from "@luz-catalogue/app/home/components/AutocompleteSearch";
import { CartTable } from "@luz-catalogue/app/home/components/CartTable";
import Button from "node_modules/@mui/material/Button";
import { useCallback, useState } from "react";
import { SearchItem } from "@luz-catalogue/app/api/catalogue/search/types";
import {
  Message,
  MessageBar,
} from "@luz-catalogue/app/home/components/MessageBar";
import exportToFile from "@luz-catalogue/app/home/utils/exportToFile";
import { CartItem } from "@luz-catalogue/app/home/types";

const Home = () => {
  const [selected, setSelected] = useState<SearchItem | null>();
  const [items, setItems] = useState<CartItem[]>([]);
  const [message, setMessage] = useState<Message>();

  const handleAdd = useCallback(() => {
    if (!selected) {
      return;
    }
    if (selected.stock <= 0) {
      setMessage({ severity: "info", text: "The item isn't in stock" });
      return;
    }
    if (items.find((item) => item.code === selected.code)) {
      setMessage({ severity: "info", text: "The item is already added" });
      return;
    }
    setItems((prev: CartItem[]) => [...prev, { ...selected, quantity: 1 }]);
  }, [selected, items]);

  const handleRemove = useCallback((code: string) => {
    setItems((prev: CartItem[]) => prev.filter((item) => item.code !== code));
  }, []);

  const handleQuantity = useCallback(
    (item: CartItem, delta: number) => {
      if (!item) {
        return;
      }
      if (delta < 0 && item.quantity < 2) {
        return;
      }
      if (delta && item.quantity + delta > item.stock) {
        setMessage({
          severity: "info",
          text: `The item quantity is limited by ${item.stock}`,
        });
        return;
      }
      item.quantity += delta;
      setItems([...items]);
    },
    [items],
  );

  const handleExport = useCallback(() => {
    if (!items.length) {
      return;
    }
    exportToFile(items);
  }, [items]);

  return (
    <Box component="main">
      <Box display="flex" flexDirection="column" padding={4} gap={2}>
        <Box display="flex" flexDirection="row" gap={2}>
          <AutocompleteSearch onSelect={setSelected} />
          <Button disabled={!selected} onClick={handleAdd}>
            Add to list
          </Button>
        </Box>
        <CartTable
          items={items}
          onQuantityChange={handleQuantity}
          onRemove={handleRemove}
        />
        <Button disabled={!items.length} onClick={handleExport}>
          Export
        </Button>
      </Box>
      <MessageBar onClose={() => setMessage(undefined)} message={message} />
    </Box>
  );
};

export default Home;
