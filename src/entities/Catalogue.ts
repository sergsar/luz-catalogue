import { ObjectId } from "mongodb";

export class Catalogue {
  constructor(
    public id: ObjectId,
    public code: string,
    public description: string,
    public price: string,
    public stock: number,

    public document_key: string,
    public created_at: Date,
    public updated_at: Date,
  ) {}
}

export type CataloguePayload = Omit<
  Catalogue,
  "id" | "created_at" | "updated_at" | "document_key"
>;
export type CatalogueKeys = keyof CataloguePayload;
