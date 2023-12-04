const mongoose = require("mongoose");

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
  user: {
    type: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          require: true,
        },
      },
    ],
  },
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          require: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  totalPrice: { type: String },
});

cartSchema.pre("findOne", function () {
  this.populate("products.product");
});
cartSchema.pre("findOne", function () {
  this.populate("user.user");
});

const cartModel = mongoose.model(cartCollection, cartSchema);

module.exports = { cartModel };
