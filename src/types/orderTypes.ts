import type { CartItemType } from "./cartTypes";

export interface ShippingAddressType {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
 state: string;
  pincode: string;
}

export interface OrderType {
  id: number;
  items: CartItemType[];

  totalPrice: number;

  totalQuantity: number;

  shippingDetails: ShippingAddressType;

  paymentMethod: string;

  createdAt: string;
}