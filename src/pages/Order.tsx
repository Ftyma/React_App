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
      <div className="relative top-40 md:top-60">
        <div className="w-10/12 mx-auto">
          <div className="grid m-auto">
            <p className=" bg-orange w-0.5 h-12 mr-4" />
            <h1 className="font-semibold text-3xl">Order History</h1>
          </div>

          {orderItems.map((item) => (
            <div
              key={item._id}
              onClick={() => handleClick(item._id)}
              className="border rounded-xl px-3 py-3 my-4 shadow-md"
            >
              <div className="flex justify-between font-semibold">
                <h1>{moment(item.date).format("DD/MM/YYYY HH:mm")}</h1>
                <h1 className="text-orange">{item.status}</h1>
              </div>
              <div className="flex justify-between">
                <h1 className="font-medium">Order Number</h1>
                <h1 className=" font-semibold">{item._id}</h1>
              </div>
            </div>
          ))}
          <br />
          <br />
        </div>
      </div>
      {selectedOrder && (
        <OrderItem orderId={selectedOrder} onClose={handleCloseDialog} />
      )}
    </>
  );
}
