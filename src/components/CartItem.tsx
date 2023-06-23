import React, { useState, useEffect } from "react";
import axios from "axios";
import { Currency } from "../pages/Currency";

type CartItemProps = {
  id: number;
  quantity: number;
};

export default function CartItem({ id, quantity }: CartItemProps) {
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

  const item = productAll.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <div key={item.id} className="grid border rounded-xl my-4 w-10/12 mx-auto">
      <img src={item.image} className="col-4 md:col-4 w-2 h-13" />
      <div className="col-4 md:col-4 m-auto ">
        <h1 className="text-lg font-medium">{item.product_name}</h1>
        <h1 className="text-md">{item.description}</h1>
      </div>

      <div className="flex col-2 md:col-2 mr-auto ">
        <button className="m-auto rounded-full border px-3 py-2">-</button>

        <h1 className="px-2 pt-2 m-auto"> {quantity}</h1>
        <button className="m-auto rounded-full border px-3 py-2">+</button>
      </div>
      <div className="flex flex-col justify-center py-12">
        <h1>{Currency(item.price)}</h1>
        <h1>{Currency(item.price * quantity)}</h1>
      </div>
    </div>
  );
}
