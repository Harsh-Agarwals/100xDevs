import User from '../models/user.models.js'
import bcrypt from 'bcrypt'
import { verificationToken } from '../utils/generateVerificationToken.js'

export const signup = async(req, res) => {
    const {email, password, name} = req.body
    try {
        if(!email || !password || !name) {
            throw new Error("All fields are required");
        } else if (User.findOne({email: email})) {
            console.log("User already exists", User.findOne({email: email}));            
            return res.status(400).json({success: false, message: "User already exists"})
        } else {
            const hashedPwd = bcrypt.hash(password, 16);
            const user = new User({
                email: email,
                password: hashedPwd,
                name: name,
                verificationToken: verificationToken,
                verificationTokenExpireAt: Date.now() + 24*60*60*1000
            })
            await user.save();
            generateTokenAndCookies(res, user._id);
            // Sending verification token to email for verification
            // JWT: securely transferring information between parties as JSON object. JWT can be signed using secret or private/public keys
            // Backend -> Generated JWT specific to the user -> sent to the frontend -> frontend send this token to get specific API resources, specific to the user
        }
    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
    res.send("SIGNUP router");
}

export const login = async(req, res) => {
    res.send("LOGIN router");
}

export const logout = async(req, res) => {
    res.send("LOGOUT router");
}