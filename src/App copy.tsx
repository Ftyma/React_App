import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import Cart from "../src/pages/Cart";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Store from "../src/pages/Store";
import { ShoppingCartProvider } from "../src/context/ShoppingCartContext";
import Order from "./pages/Order";

function App() {
  const items = [
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/cart", element: <Cart /> },
    { path: "/store", element: <Store /> },
    { path: "/order", element: <Order /> },
  ];

  const Middleware = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();

    if (1 != 1) {
      return children;
    } else {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    // return children;
  };
  return (
    <ShoppingCartProvider>
      <Middleware>
        <Routes>
          {items.map((routes) => (
            <Route path={routes.path} element={routes.element} />
          ))}
        </Routes>
      </Middleware>
    </ShoppingCartProvider>
  );
}
export default App;
