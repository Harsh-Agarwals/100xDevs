const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    address :{
        type: String,
        required: true
    },
    diagnosedWith: {
        type: String,
        required: true,
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital"
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },
    medicalRecord: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MedicalRecord"
    }
}, {
    timestamps: true
})

export const Patient = new mongoose.model("Patient", patientSchema);