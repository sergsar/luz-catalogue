import { CartItem } from "@luz-catalogue/app/home/types";
import * as XLSX from "@e965/xlsx";

const exportToFile = (items: CartItem[]) => {
  const mapped = items.map((item) => ({
    code: item.code,
    description: item.description,
    quantity: item.quantity,
  }));
  const headers = Object.keys(mapped[0]); // should be translated?
  const workBook = XLSX.utils.book_new();
  const workSheet = XLSX.utils.json_to_sheet(mapped, { header: headers });
  workSheet["!cols"] = [{ wch: 20 }, { wch: 60 }, { wch: 10 }];
  XLSX.utils.book_append_sheet(workBook, workSheet, `response`);
  XLSX.writeFile(workBook, "catalogue-cart.xls");
};

export default exportToFile;
