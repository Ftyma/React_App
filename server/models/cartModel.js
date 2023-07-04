const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    uid: {
      type: String,
      ref: "Users",
    },
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
    orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },

  {
    timestamps: true,
  }
);
const Cart = mongoose.model("carts", cartSchema, "carts");
module.exports = Cart;
