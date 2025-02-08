const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'required']
    },
    description: {
        type: String,
        required: [true, 'required']
    },
    productImage: {
        type: String
    },
    price: {
        type: Number,
        required: [true, 'required'],
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, 'required']
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        required: [true, 'required']
    }
}, {
    timestamps: true
})

export const Product = mongoose.model("Product", productSchema);