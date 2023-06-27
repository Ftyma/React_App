import { Button } from "primereact/button";
import React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Currency } from "../pages/Currency";
import custom from "../css/Cart.module.css";

function OrderItem({ orderId, onClose }) {
  const { orderItems } = useShoppingCart();
  const selectedOrder = orderItems.find((item) => item._id === orderId);

  const goBack = () => {
    onClose();
  };

  if (!selectedOrder) {
    return null;
  }

  let total: number = 0;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={goBack} />

      <div className="fixed bg-white inset-0 w-screen h-screen items-center justify-center z-10 ">
        <div className="bg-orange h-40">
          <Button
            icon="pi pi-chevron-left"
            className={`p-button-rounded p-button-circle ml-3 mt-3 ${custom.backBtn}`}
            onClick={goBack}
          />
          <h1 className="text-xl text-center font-semibold text-white">
            Order Details
          </h1>
        </div>
        <div className="flex justify-center">
          <div className="bg-white w-10/12 md:w-8/12 h-full border rounded-3xl p-6 fixed top-24 overflow-y-auto">
            <div className="pb-4">
              <div className="flex">
                <p>Order Number:</p>
                <p className="font-semibold ml-2">{selectedOrder._id}</p>
              </div>
              <div className="flex">
                <p>Status:</p>
                <p className="text-orange ml-2">{selectedOrder.status}</p>
              </div>
            </div>
            <div className="h-px bg-gray-500" />

            {selectedOrder.orders.map((item) => {
              total += item.price * item.quantity;
              return (
                <>
                  <div key={item._id} className="py-4">
                    <p className="font-semibold">{item.product_name}</p>
                    <div className="flex justify-between font-semibold">
                      <p>{item.description}</p>
                      <p>x{item.quantity}</p>
                    </div>
                    <div className="flex justify-end text-orange font-semibold">
                      <p>{Currency(item.price)}</p>
                    </div>
                  </div>
                  <div className="h-px bg-gray-500" />
                </>
              );
            })}
            <div className="font-semibold text-lg flex justify-between mt-3 mb-16">
              <h1>Total: </h1>
              <h1 className="text-orange">{Currency(total)}</h1>
            </div>
            <br />
            <br />
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderItem;
