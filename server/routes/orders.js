const express = require("express");
const router = express.Router();
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");

//get all Order item
router.get("/getAll", async (req, res) => {
  Order.find()
    .then((orders) => res.json(orders))
    .catch((err) => {
      console.log("Error:", err);
      res.status(400).json("Error fetching order");
    });
});

//push and delete all data from Cart to Order db
router.post("/submit", async (req, res) => {
  try {
    const carts = await Cart.find();
    if (carts.length === 0) {
      res.status(400).json({ message: "no products in carts" });
    }

    const orderItems = carts.map((item) => ({
      id: item.id,
      product_name: item.product_name,
      price: item.price,
      quantity: item.quantity,
    }));

    const order = new Order({
      status: "Not Processed",
      orders: orderItems,
      date: new Date(),
    });

    order
      .save()
      .then(() => {
        return Cart.deleteMany();
      })
      .then(() => {
        res.json("Order placed success");
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
