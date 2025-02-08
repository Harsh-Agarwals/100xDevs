const mongoose = require("mongoose")

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'Must be unique'],
        required: [true, 'required']
    },
    product: [
        {
            name: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
}, {
    timestamps: true
})

export const SubCategory = mongoose.model("SubCategory", subCategorySchema);