import React, { useState } from "react";
import { Currency } from "./Currency";

import { useShoppingCart } from "../context/ShoppingCartContext";
import Navbar from "../components/Navbar";

const Cart = () => {
  const {
    cartItems,
    removeItem,
    increaseCartQuantity,
    decreaseCartQuantity,
    handleSubmitOrder,
  } = useShoppingCart();

  const totalPrice = () => {
    try {
      let total: number = 0;
      cartItems?.map((item: any) => {
        total += item.price * item.quantity;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-orange h-screen">
      <Navbar />
      <div className="bg-white h-full rounded-3xl relative top-52">
        <br />
        <h1 className="text-3xl text-left ml-7 mt-4">Shopping Cart</h1>
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="grid border rounded-xl my-4 w-10/12 mx-auto"
          >
            <img src={item.image} className="col-4 md:col-4 w-2 h-13" />
            <div className="col-4 md:col-4 m-auto ">
              <h1 className="text-lg font-medium">{item.product_name}</h1>
              <h1 className="text-md">{item.description}</h1>
            </div>

            <div className="flex col-3 md:col-2 m-auto ">
              <button
                onClick={() => decreaseCartQuantity(item._id)}
                className="m-auto rounded-full border px-3 py-2"
              >
                -
              </button>

              <p className="px-2 pt-2 m-auto">{item.quantity}</p>

              <button
                onClick={() => increaseCartQuantity(item._id)}
                className="m-auto rounded-full border px-3 py-2"
              >
                +
              </button>
            </div>

            <div className="col-3 md:col-3 m-auto">
              <h1 className="text-center">{Currency(item.price)}</h1>
              <button
                className="flex text-red-600 underline m-auto"
                onClick={() => removeItem(item._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="flex flex-col border py-4 shadow-2xl w-full mt-16">
          <p className="text-xl font-semibold mx-auto">
            Total: <span className="mx-5">{Currency(totalPrice())} </span>
          </p>
          <button
            onClick={handleSubmitOrder}
            className="px-2 py-1 bg-orange rounded-3xl mx-auto text-white shadow-lg w-7/12 mt-2"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
