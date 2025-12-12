import { Catalogue } from "@luz-catalogue/entities/Catalogue";

export type SearchItem = Pick<Catalogue, "code" | "description" | "stock">;
