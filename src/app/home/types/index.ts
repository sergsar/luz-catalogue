import { SearchItem } from "@luz-catalogue/app/api/catalogue/search/types";

export type CartItem = SearchItem & { quantity: number };
