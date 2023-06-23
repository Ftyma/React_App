import React from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "../src/pages/Cart";
import Login from "../src/pages/Login";

import Product from "../src/pages/Product";
import Register from "../src/pages/Register";
import Store from "../src/pages/Store";
import Test from "../src/pages/Test";
import Navbar from "../src/components/Navbar";
import { ShoppingCartProvider } from "../src/context/ShoppingCartContext";

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/test" element={<Test />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </ShoppingCartProvider>
  );
}
export default App;
// import React from "react";
// import Router from "./routes";
// import { RouterProvider } from "react-router-dom";

// export default function App() {
//   return <RouterProvider router={Router} />;
// }
