import React from "react";
import Router from "./routes";
import { RouterProvider } from "react-router-dom";

export default function App() {
  return <RouterProvider router={Router} />;
}
