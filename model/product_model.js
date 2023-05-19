const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

const productSchema = mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    name: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      lowercase: true,
      trim: true,
    },
    price: {
      type: Number,
      default: 1,
    },
    productImage: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 1,
    }
  },
  { timestamps: true } 
    /********TIMESTAMPS IS USED TO UPDATE CREATED AND UPDATE AT */

);
productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Product", productSchema);
