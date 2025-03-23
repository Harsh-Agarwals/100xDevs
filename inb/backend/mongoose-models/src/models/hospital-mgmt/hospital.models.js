const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    departments: {
        type: [String],
        required: true
    },
    doctors: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor"
        }]
    },
    numRooms: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
})

export const Hospital = mongoose.model("Hospital", hospitalSchema);