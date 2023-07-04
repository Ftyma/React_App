import React from "react";
import { RouterProvider } from "react-router-dom";
import Router from "./routes";
import { ShoppingCartProvider } from "../src/context/ShoppingCartContext";

function App() {
  return (
    <ShoppingCartProvider>
      <RouterProvider router={Router} />
    </ShoppingCartProvider>
  );
}

export default App;
