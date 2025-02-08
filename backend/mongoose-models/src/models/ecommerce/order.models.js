const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, 'required']
    },
    quantity: {
        type: Number,
        required: [true, 'required']
    }
});

const orderSchema = new mongoose.Schema({
    orderItems: {
        type: [orderItemSchema]
    },
    price: {
        type: Number,
        default: 0,
        required: [true, 'required']
    },
    address: {
        type: String,
        required: [true, 'required']
    },
    status: {
        type: String,
        enum: ["DELIVERED", "CANCELLED", "PENDING"],
        default: "PENDING",
        required: [true, 'required']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

export const Order = mongoose.model("Order", orderSchema);