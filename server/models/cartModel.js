const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    description: {
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
    group_id: {
      type: Number,
      required: true,
    },
    category: [
      {
        type: Number,
        required: true,
      },
    ],
  },

  {
    timestamps: true,
  }
);
const Cart = mongoose.model("carts", cartSchema, "carts");
module.exports = Cart;
