const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "required"],
    lowercase: [true, "Must be lowercase"],
    unique: true
  },
  email: {
    type: String,
    required: [true, "required"],
    lowercase: [true, "Must be lowercase"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Minimum password length must be 8."]
  }
}, {
  timestamps: true
});

export const User = mongoose.model("User", userSchema);