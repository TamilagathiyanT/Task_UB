const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  mobile: {
    type: Number,
    required: [true, "Please provide your mobile no"],
    unique: true,
    validate: {
      validator: function (el) {
        let pattern = /^\d{10}$/;
        return pattern.test(el);
      },
      message: "Invalid Mobile Number",
    },
  },
  otp: {
    type: Number,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
