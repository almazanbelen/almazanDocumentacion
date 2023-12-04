const mongoose = require("mongoose");

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
  code: { type: String, require: true },
  date: { type: Date, require: true },
  purchase: {
    type: [
      {
        cart: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "carts",
          require: true,
        },
      },
    ],
  },
  amount: { type: Number, require: true },
});
ticketSchema.pre("findOne", function () {
  this.populate("purchase.cart");
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

module.exports = { ticketModel };
