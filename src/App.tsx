import React from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "../src/pages/Cart";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Store from "../src/pages/Store";
import { ShoppingCartProvider } from "../src/context/ShoppingCartContext";
import Order from "./pages/Order";

function App() {
  return (
    <ShoppingCartProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/store" element={<Store />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </ShoppingCartProvider>
  );
}
export default App;
