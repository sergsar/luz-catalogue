import { NextRequest } from "next/server";
import parseError from "@luz-catalogue/utils/parseError";
import parseCatalogueFile from "@luz-catalogue/app/api/catalogue/upload-file/parseCatalogueFile";
import { validateCatalogueItems } from "@luz-catalogue/app/api/catalogue/upload-file/catalogueSchema";
import writeCatalogueToDatabase from "@luz-catalogue/app/api/catalogue/upload-file/writeCatalogueToDatabase";
import { UploadFileResponse } from "@luz-catalogue/app/api/catalogue/upload-file/types";

export const POST = async function (req: NextRequest) {
  try {
    const formData = await req.formData();
    const [file] = formData.getAll("file") as File[];
    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }
    const parsed = await parseCatalogueFile(file);
    const { validated: items, errors } = await validateCatalogueItems(parsed);
    if (!items.length) {
      const response: UploadFileResponse = { data: { errors } };
      return Response.json(response, { status: 400 });
    }
    const result = await writeCatalogueToDatabase(items);
    const response: UploadFileResponse = { data: { items, errors, result } };
    return Response.json(response);
  } catch (e) {
    const error = parseError(e);
    const response: UploadFileResponse = { error };
    return Response.json(response, { status: 500 });
  }
};
