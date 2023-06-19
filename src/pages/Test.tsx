import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Test() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    await axios
      .get("http://localhost:3000/products")
      .then((res) => {
        console.log(res.data);
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {items.map((data: any) => (
        <p>{data.product_name}</p>
      ))}
    </div>
  );
}
