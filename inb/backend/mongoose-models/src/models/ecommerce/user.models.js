const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "required"],
        unique: true,
        lowercase: [true, "Must be lowercase"]
    },
    email: {
        type: String,
        required: [true, "required"],
        unique: [true, "This already exists, try different email address."]
    },
    password: {
        type: String,
        minLength: [8, "Length must be greater than 8."],
        required: [true, "required"]
    }
}, {
    timestamps: true
})

export const User = mongoose.model("User", userSchema);