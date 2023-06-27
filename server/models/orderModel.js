const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    status: {
      type: String,
      default: "Not Processed",
      enum: ["Not Processed", "Processing", "Cancalled", "Delivered"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    orders: [
      {
        id: {
          type: Number,
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
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);
const Order = mongoose.model("order", orderSchema);
module.exports = Order;
