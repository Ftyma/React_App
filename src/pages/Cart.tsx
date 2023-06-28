import React, { useState } from "react";
import { Currency } from "./Currency";

import { useShoppingCart } from "../context/ShoppingCartContext";
import Navbar from "../components/Navbar";

import { InputNumber } from "primereact/inputnumber";
import custom from "../css/Cart.module.css";
import { Button } from "primereact/button";

const Cart = () => {
  const {
    cartItems,
    removeItem,
    increaseCartQuantity,
    decreaseCartQuantity,
    handleSubmitOrder,
    handleChange,
  } = useShoppingCart();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      removeItem(id);
    }
  };
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
      <div className="bg-white h-full rounded-3xl relative top-52  overflow-y-auto">
        <br />
        <h1 className="text-3xl text-left ml-7 mt-4">Shopping Cart</h1>
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="grid border rounded-xl my-4 w-10/12 mx-auto"
          >
            <img src={item.image} className="col-3 md:col-3 w-2 h-13" />
            <div className="col-3 md:col-3 m-auto ">
              <h1 className="text-lg font-medium">{item.product_name}</h1>
              <h1 className="text-md">{item.description}</h1>
            </div>

            <div className="col-4 md:col-3 m-auto">
              <div className="grid ">
                <div className="col-4 md:col-3">
                  <Button
                    icon="pi pi-minus"
                    onClick={() => decreaseCartQuantity(item._id)}
                    className={`p-button-rounded p-button-circle ${custom.addBtn}`}
                  />
                </div>

                <div className="col-4 md:col-3">
                  <InputNumber
                    value={item.quantity}
                    min={1}
                    inputClassName={`w-10 text-center h-10 my-auto`}
                    onValueChange={(e) => handleChange(e, item._id)}
                  />
                </div>

                <div className="col-4 md:col-3">
                  <Button
                    icon="pi pi-plus"
                    onClick={() => increaseCartQuantity(item._id)}
                    className={`p-button-rounded p-button-circle ${custom.addBtn}`}
                  />
                </div>
              </div>
            </div>

            <div className="col-2 md:col-2 m-auto">
              <h1 className="text-center">{Currency(item.price)}</h1>
            </div>
            <Button
              icon="pi pi-trash"
              className={`mx-auto p-button-rounded p-button-circle ${custom.removeBtn} `}
              onClick={() => handleDelete(item._id)}
            />
          </div>
        ))}

        <div className="fixed bottom-0 bg-white flex flex-col border py-4 shadow-2xl w-full mt-16">
          <p className="text-xl font-semibold mx-auto">
            Total: <span className="mx-24">{Currency(totalPrice())} </span>
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
