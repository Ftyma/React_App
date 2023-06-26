import React from "react";
import { useParams } from "react-router-dom";
import OrderItem from "../components/OrderItem";

export default function OrderDetail() {
  const { id } = useParams();
  return (
    <>
      <p>Helo</p>
      <OrderItem orderId={id} />
    </>
  );
}
