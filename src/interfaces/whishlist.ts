import { Product } from "./product";

export interface WishlistResponse {
  status: string;
  count: number;
  data: Product[];
}
