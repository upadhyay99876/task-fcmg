const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
    /********TIMESTAMPS IS USED TO UPDATE CREATED AND UPDATE AT */

);

module.exports = mongoose.model("Cart", cartSchema);
