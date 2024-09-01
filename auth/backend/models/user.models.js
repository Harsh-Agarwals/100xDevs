import mongoose from 'mongoose'
const { Schema, model } = mongoose

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastLogin: {
        type: Date,
        default: Date.now()
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPaswordTokenExpireAt: Date,
    verificationToken: String,
    verificationTokenExpireAt: Date
}, {timestamps: true})

const User = model('User', userSchema);
export default User;
