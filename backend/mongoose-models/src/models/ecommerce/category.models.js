const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'required'],
        unique: [true, 'Must be unique']
    },
    subcategory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory"
        }
    ]
}, {
    timestamps: true
})

export const Category = mongoose.model("Category", categorySchema);