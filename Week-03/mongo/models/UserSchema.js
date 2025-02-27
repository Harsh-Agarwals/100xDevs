const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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

const User = mongoose.model('User', UserSchema);
module.exports = User;