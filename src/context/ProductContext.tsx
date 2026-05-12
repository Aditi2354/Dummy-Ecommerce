import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";

import type { Product } from "../types/productTypes";

import {
  addProduct as addProductService,
  deleteProduct as deleteProductService,
  getProducts,
  initializeProducts,
  updateProduct as updateProductService
} from "../services/productService";

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (
    product: Product
  ) => void;
  deleteProduct: (
    productId: number
  ) => void;
}

const ProductContext =
  createContext<
    ProductContextType | undefined
  >(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({
  children
}: ProductProviderProps) => {
  const [products, setProducts] = useState<
    Product[]
  >([]);

  useEffect(() => {
    initializeProducts();

    const storedProducts = getProducts();

    setProducts(storedProducts);
  }, []);

  const addProduct = (
    product: Product
  ) => {
    addProductService(product);

    setProducts(getProducts());
  };

  const updateProduct = (
    product: Product
  ) => {
    updateProductService(product);

    setProducts(getProducts());
  };

  const deleteProduct = (
    productId: number
  ) => {
    deleteProductService(productId);

    setProducts(getProducts());
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context =
    useContext(ProductContext);

  if (!context) {
    throw new Error(
      "useProduct must be used within ProductProvider"
    );
  }

  return context;
};