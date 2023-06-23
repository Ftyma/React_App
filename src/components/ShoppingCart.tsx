import React, { useState, useEffect } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
import { Currency } from "../pages/Currency";

import axios from "axios";
import { Dialog } from "primereact/dialog";

type ShoppingCartProps = {
  isOpen: boolean;
};

export default function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const [productAll, setProductAll] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setProductAll(res.data);
      console.log("fetched products ", res.data);
    } catch (error) {
      console.error("Error fetching products ", error);
    }
  };

  return (
    <Dialog visible={isOpen} onHide={closeCart}>
      <h1>Shopping Cart</h1>

      {cartItems.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
      <div>
        <h1 className="text-lg font-semibold">
          Total:
          {Currency(
            cartItems.reduce((total, cartItem) => {
              const item = productAll.find((i) => i.id === cartItem.quantity);
              return total + (item?.price || 0) * cartItem.quantity;
            }, 0)
          )}
        </h1>
      </div>
    </Dialog>
  );
}
