import React from "react";

const Currency = (price: number) => {
  return price.toLocaleString("th-TH", {
    style: "currency",
    currency: "THB",
  });
};

export { Currency };
