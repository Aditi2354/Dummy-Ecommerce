import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

import {
  BrowserRouter
} from "react-router-dom";

import {
  AuthProvider
} from "./context/AuthContext";

import "react-toastify/dist/ReactToastify.css";
import CartProvider from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
ReactDOM.createRoot(
  document.getElementById("root")!
).render(

  <React.StrictMode>

    <BrowserRouter>

      <AuthProvider>

        <ProductProvider>

          <CartProvider>

          <App />

          </CartProvider>

        </ProductProvider>

      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>
);