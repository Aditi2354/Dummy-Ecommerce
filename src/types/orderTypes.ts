import type { CartItemType } from "./cartTypes";

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderType {
  id: string;

  products: CartItemType[];

  totalPrice: number;

  totalQuantity: number;

  shippingDetails: ShippingDetails;

  paymentMethod: string;

  createdAt: string;
}