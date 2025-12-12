import { CataloguePayload } from "@luz-catalogue/entities/Catalogue";
import { BulkWriteResult } from "mongodb";

export type UploadFileResponseData = {
  items?: CataloguePayload[];
  errors?: string[];
  result?: BulkWriteResult;
};

export type UploadFileResponse = {
  error?: string;
  data?: UploadFileResponseData;
};
