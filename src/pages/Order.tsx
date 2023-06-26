import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useShoppingCart } from "../context/ShoppingCartContext";
import moment from "moment";
import OrderItem from "../components/OrderItem";

export default function Order() {
  const { orderItems } = useShoppingCart();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleClick = (itemId) => {
    setSelectedOrder(itemId);
  };

  const handleCloseDialog = () => {
    setSelectedOrder(null);
  };

  return (
    <>
      <Navbar />
      <div className="relative top-40">
        <h1 className="font-semibold text-3xl">Order History</h1>
        <div className="w-10/12 mx-auto my-6">
          {orderItems.map((item) => (
            <div
              key={item._id}
              onClick={() => handleClick(item._id)}
              className="border rounded-xl px-3 py-3 my-4"
            >
              <div className="flex justify-between font-semibold">
                <h1>{moment(item.date).format("DD/MM/YYYY HH:mm")}</h1>
                <h1>{item.status}</h1>
              </div>
              <div className="flex justify-between font-semibold">
                <h1>Order Number</h1>
                <h1>{item._id}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedOrder && (
        <OrderItem orderId={selectedOrder} onClose={handleCloseDialog} />
      )}
    </>
  );
}
