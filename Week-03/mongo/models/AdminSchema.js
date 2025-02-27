const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Minimum password length must be 8!"]
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }]
}, {timestamps: true});

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;