import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Product from "../pages/Product";
import Register from "../pages/Register";
import Test from "../pages/Test";

const Router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "product",
    element: <Product />,
  },
  {
    path: "cart",
    element: <Cart />,
  },
  {
    path: "test",
    element: <Test />,
  },
]);

export default Router;
