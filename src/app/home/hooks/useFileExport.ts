import { useCallback, useMemo } from "react";
import { CartItem } from "@luz-catalogue/app/home/types";
import * as XLSX from "@e965/xlsx";
import { useTranslations } from "next-intl";

const useFileExport = () => {
  const t = useTranslations("home.table");

  const exportData = useCallback(
    (items: CartItem[]) => {
      const mapped = items.map((item) => ({
        [t("code")]: item.code,
        [t("description")]: item.description,
        [t("price")]: item.calcPrice,
        [t("quantity")]: item.quantity,
      }));

      const workBook = XLSX.utils.book_new();
      const workSheet = XLSX.utils.json_to_sheet(mapped);
      workSheet["!cols"] = [{ wch: 20 }, { wch: 60 }, { wch: 10 }];
      XLSX.utils.book_append_sheet(workBook, workSheet, `response`);
      XLSX.writeFile(workBook, "catalogue-cart.xls");
    },
    [t],
  );

  return useMemo(
    () => ({
      exportData,
    }),
    [exportData],
  );
};

export default useFileExport;
