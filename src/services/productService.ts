import { products as dummyProducts } from "../data/product";
import type { Product } from "../types/productTypes";

const PRODUCT_KEY = "products";

export const initializeProducts = () => {
  const storedProducts = localStorage.getItem(PRODUCT_KEY);

  if (!storedProducts) {
    localStorage.setItem(
      PRODUCT_KEY,
      JSON.stringify(dummyProducts)
    );
  }
};

export const getProducts = (): Product[] => {
  const storedProducts =
    localStorage.getItem(PRODUCT_KEY);

  if (!storedProducts) {
    return [];
  }

  const parsedProducts = JSON.parse(storedProducts);

  return Array.isArray(parsedProducts)
    ? parsedProducts
    : [];
};

export const saveProducts = (
  products: Product[]
) => {
  localStorage.setItem(
    PRODUCT_KEY,
    JSON.stringify(products)
  );
};

export const addProduct = (
  product: Product
) => {
  const products = getProducts();

  const updatedProducts = [
    ...products,
    product
  ];

  saveProducts(updatedProducts);
};

export const updateProduct = (
  updatedProduct: Product
) => {
  const products = getProducts();

  const updatedProducts = products.map(
    (product) =>
      product.id === updatedProduct.id
        ? updatedProduct
        : product
  );

  saveProducts(updatedProducts);
};

export const deleteProduct = (
  productId: number
) => {
  const products = getProducts();

  const updatedProducts = products.filter(
    (product) => product.id !== productId
  );

  saveProducts(updatedProducts);
};