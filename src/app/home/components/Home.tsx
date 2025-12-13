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
import { CartItem } from "@luz-catalogue/app/home/types";
import { useTranslations } from "next-intl";
import useFileExport from "@luz-catalogue/app/home/hooks/useFileExport";

const Home = () => {
  const [selected, setSelected] = useState<SearchItem | null>();
  const [items, setItems] = useState<CartItem[]>([]);
  const [message, setMessage] = useState<Message>();
  const { exportData } = useFileExport();
  const t = useTranslations("home");

  const handleAdd = useCallback(() => {
    if (!selected) {
      return;
    }
    if (selected.stock <= 0) {
      setMessage({ severity: "info", text: t("message.item_not_in_stock") });
      return;
    }
    if (items.find((item) => item.code === selected.code)) {
      setMessage({ severity: "info", text: t("message.item_already_added") });
      return;
    }
    setItems((prev: CartItem[]) => [
      ...prev,
      { ...selected, quantity: 1, calcPrice: selected.price },
    ]);
  }, [selected, items, t]);

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
          text: t("message.item_quantity_is_limited_by", {
            quantity: item.stock,
          }),
        });
        return;
      }
      item.quantity += delta;
      item.calcPrice = (parseFloat(item.price) * item.quantity).toFixed(2);
      setItems([...items]);
    },
    [items, t],
  );

  const handleExport = useCallback(() => {
    if (!items.length) {
      return;
    }
    exportData(items);
  }, [items, exportData]);

  return (
    <Box component="main">
      <Box display="flex" flexDirection="column" padding={4} gap={2}>
        <Box display="flex" flexDirection="row" gap={2}>
          <AutocompleteSearch onSelect={setSelected} />
          <Button disabled={!selected} onClick={handleAdd}>
            {t("add_to_list")}
          </Button>
        </Box>
        <CartTable
          items={items}
          onQuantityChange={handleQuantity}
          onRemove={handleRemove}
        />
        <Button disabled={!items.length} onClick={handleExport}>
          {t("export")}
        </Button>
      </Box>
      <MessageBar onClose={() => setMessage(undefined)} message={message} />
    </Box>
  );
};

export default Home;
