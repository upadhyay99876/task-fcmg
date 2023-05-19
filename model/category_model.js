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
  { timestamps: true } //to include createdAt and updatedAt
);

module.exports = mongoose.model("Category", cateSchema);
