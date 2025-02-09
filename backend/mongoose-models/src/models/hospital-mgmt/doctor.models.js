const mongoose = require("mongoose");

const hospitalDetails = new mongoose.Schema({
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital"
    },
    numberOfHours: {
        type: Number,
        required: true
    }
})

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    department: {
        type: [String],
        requrired: true
    },
    speciality: {
        type: [String],
        requried: true
    },
    salary: {
        type: Number,
        required: true,
        default: 100000
    },
    experience: {
        type: Number,
        required: true
    },
    presence: {
        type: [hospitalDetails]
    },

}, {
    timestamps: true
})

export const Doctor = mongoose.model("Doctor", doctorSchema);