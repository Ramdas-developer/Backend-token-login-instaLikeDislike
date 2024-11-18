const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  
  productCount: {
     type : Number,
     default : 0,
  },
  product: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      quantity: { type: Number, default: 1, min: 1 },
      price: { type: Number },
      addedat: {type: Date, default : Date.now()}
    },
  ],
});

const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
