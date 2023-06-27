const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },

  {
    timestamps: true,
  }
);
const Cart = mongoose.model("carts", cartSchema, "carts");
module.exports = Cart;
