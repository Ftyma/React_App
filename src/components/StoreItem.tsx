import React, { useState } from "react";

import custom from "../css/Products.module.css";

import { Currency } from "../pages/Currency";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useShoppingCart } from "../context/ShoppingCartContext";

type StoreItemProps = {
  product: {
    id: string;
    product_name: string;
    description: string;
    price: number;
    image: string;
  };
};

export function StoreItem({ product }: StoreItemProps) {
  const [showDialog, setShowDialog] = useState(false);

  const { getItemQuantity, handleAddToCart, cartQuantity } = useShoppingCart();

  const quantity = getItemQuantity(product.id);

  const handleImageClick = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const addToCart = () => {
    console.log(product.id);
    handleAddToCart(product.id);
    handleCloseDialog();
  };

  return (
    <>
      <div className="col-3 md:col-3 lg:col-3">
        <Card
          className="border rounded-2xl"
          style={{ width: "350px", height: "450px" }}
        >
          <img
            src={product.image}
            onClick={handleImageClick}
            className="w-48 h-48 mx-auto"
          />

          <h1 className={`text-xl ${custom.productText}`}>
            {product.product_name}
          </h1>
          <h1 className="">{product.description}</h1>

          <br />
          <div className="flex justify-between">
            <span>
              <p className="text-lg text-orange">{Currency(product.price)}</p>
              <p className="opacity-50 line-through">
                {Currency(product.price)}
              </p>
            </span>

            <Button
              className={`${custom.productAddButton}`}
              icon="pi pi-plus"
              onClick={() => handleAddToCart(product._id)}
            ></Button>
          </div>

          {showDialog && (
            <Dialog visible={showDialog} onHide={handleCloseDialog}>
              <div className="grid">
                <div className="col-6 md:col-6">
                  <img src={product.image} className="w-52 mx-auto" />
                </div>
                <Card className={`col-6 md:col-6 border ${custom.popupCard}`}>
                  <p className="text-lg">{product.product_name}</p>
                  <p>{product.description}</p>
                  <br />
                  <p className={`text-lg text-orange`}>
                    {Currency(product.price)}
                  </p>
                  <p className="opacity-50 line-through">
                    {Currency(product.price)}
                  </p>
                </Card>
              </div>
              <Button
                icon="pi pi-plus"
                onClick={() => handleAddToCart(product._id)}
                className={`${custom.popupButton}`}
              >
                Add to Cart
              </Button>
            </Dialog>
          )}
        </Card>
      </div>
    </>
  );
}
