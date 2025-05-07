const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    type: Schema.ObjectId,
    ref: "Cart",
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
