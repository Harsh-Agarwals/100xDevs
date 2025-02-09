const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema({
    name: String,
    age: Number,
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital"
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },
    gender: {
        type: String,
        enum: ['M', 'F', 'O']
    },
    diagnosis: {
        type: [String],
        required: true
    },
    images: {
        type: String
    },
    recommendations: {
        type: [String],
        required: true
    },
    tests: [{
            type: String,
            date: Date
        }]
}, {
    timestamps: true
})

export const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);