const express = require("express");
const router = express.Router();
const Cart = require("../models/cartModel");

// Get all carts
router.get("/get-carts", async (req, res) => {
  try {
    const carts = await Cart.find({});
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get by id
router.get("/get-cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findById(id);
    if (!cart) {
      return res
        .status(404)
        .json({ message: `Product not found with ID ${id}` });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new cart
router.post("/add-carts", async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.create(req.body);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.post("/add-carts", async (req, res) => {
//   const { productId, quantity } = req.body;

//   try {
//     let item = await Cart.findById(productId);

//     if(item){
//       let itemIndex = item.findIndex(p=> p._id == productId );

//       if(itemIndex>-1){
//         let prodItem = cart[itemIndex];
//         productId.quantity += quantity;
//         cart[itemIndex] = pro
//       }

//       cart = await cart.save();
//       return res.status(201).send(cart);

//     }

//     const cart = await Cart.create(req.body);
//     res.status(201).json(cart);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

router.delete("/delete-carts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findByIdAndDelete(id);
    if (!cart) {
      return res
        .status(400)
        .json({ message: `can't find any product with ID ${id}` });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
