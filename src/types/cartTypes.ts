import type { ProductType } from "./productTypes";

export interface CartItemType extends ProductType {
  quantity: number;
}