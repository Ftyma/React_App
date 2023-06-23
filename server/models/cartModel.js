const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    _id: {
      // Update the field name to _id
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },

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
    quantity: {
      type: Number,
      // required: true,
    },
  },

  {
    timestamps: true,
  }
);
const Cart = mongoose.model("carts", cartSchema, "carts");
module.exports = Cart;
