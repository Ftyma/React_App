import React from "react";
import logo from "../assets/logo.svg";
import { useShoppingCart } from "../context/ShoppingCartContext";
import Sidebar from "../pages/Sidebar";
import { Button } from "primereact/button";

export default function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart();

  return (
    <>
      <div className="fixed bg-orange w-full z-2">
        <Sidebar />
        <img src={logo} className="mx-auto w-3/12 h-50" />
        {/* <div className="flex ">
          <Button icon="pi pi-plus" onClick={openCart} className=""></Button>
          <div>{cartQuantity}</div>
        </div> */}
      </div>
    </>
  );
}
