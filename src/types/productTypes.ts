export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  createdAt?: string;
  updatedAt?: string;
}

export type ProductType = Product;