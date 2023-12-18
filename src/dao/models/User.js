const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, index: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String },
  documents: {
    type: [
      {
        name: { type: String },
        reference: { type: String },
      },
    ],
  },
  last_connection: { type: String }
});

const User = mongoose.model("users", userSchema);

module.exports = User;
