const mongoose = require("mongoose");

const cateSchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      
      required: true,
  
      enum : ['Home care','Personal care','Food & beverages'],
      default: 'Personal care'

    }
  },
  { timestamps: true } 
    /********TIMESTAMPS IS USED TO UPDATE CREATED AND UPDATE AT */

);

module.exports = mongoose.model("Category", cateSchema);
