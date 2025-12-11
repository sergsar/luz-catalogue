import * as XLSX from "@e965/xlsx";
import {
  CatalogueKeys,
  CataloguePayload,
} from "@luz-catalogue/entities/Catalogue";

const fields = ["Código.", "Descripción", "P.Venta", "Stock()"] as const;
type Field = (typeof fields)[number];

const dictionary: Record<Field, CatalogueKeys> = {
  "Código.": "code",
  Descripción: "description",
  "P.Venta": "price",
  "Stock()": "stock",
};

const buildData = (items: NonNullable<unknown>[]) => {
  const header = items.find((item) => {
    const values = Object.values(item);
    return fields.every((field) => values.includes(field));
  });
  if (!header) {
    throw new Error(
      `Wrong data format - header not detected. 
      Make sure the document includes the following fields: ${fields.join(", ")}`,
    );
  }
  console.log(header);
  const reversed = Object.fromEntries(
    Object.entries(header).map((item) => item.toReversed()),
  );

  const count = Object.entries(header).length;
  const rows: CataloguePayload[] = [];
  for (const item of items) {
    if (item === header) {
      continue;
    }
    if (Object.entries(item).length !== count) {
      continue;
    }
    const row = {} as CataloguePayload;
    for (const field of fields) {
      const key = reversed[field] as never;
      const translated = dictionary[field];
      row[translated] = item[key];
    }
    rows.push(row);
  }

  return rows;
};

const parseCatalogueFile = async (file: File) => {
  const buffer = await file.arrayBuffer();

  // Parse the Excel file
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  const items = XLSX.utils.sheet_to_json<NonNullable<unknown>>(worksheet);
  const rows = buildData(items);

  return rows;
};

export default parseCatalogueFile;
