import User from '../models/user.models.js'
import bcrypt from 'bcrypt'
import { verificationToken } from '../utils/generateVerificationToken.js'
import { generateTokenAndCookies } from '../utils/generateTokenAndCookies.js'
import { sendVerificationCode, sendVerificationMail } from '../mails/mails.js'

export const signup = async(req, res) => {
    const {email, password, name} = req.body
    try {
        if(!email || !password || !name) {
            throw new Error("All fields are required");
        } else if (await User.findOne({email: email})) {
            console.log("User already exists", User.findOne({email: email}));            
            return res.status(400).json({success: false, message: "User already exists"})
        } else {
            const hashedPwd = await bcrypt.hash(password, 16);
            const user = new User({
                email: email,
                password: hashedPwd,
                name: name,
                verificationToken: verificationToken,
                verificationTokenExpireAt: Date.now() + 24*60*60*1000
            })
            await user.save();
            // First authenticating client
            // then Sending verification token to email for verification
            // JWT: securely transferring information between parties as JSON object. JWT can be signed using secret or private/public keys
            // Backend -> Generated JWT specific to the user -> sent to the frontend -> frontend send this token to get specific API resources, specific to the user
            generateTokenAndCookies(res, user._id);
            await sendVerificationCode(user.email, verificationToken);
            res.status(201).json({
                success: true,
                message: "Success creating user",
                user: {
                    ...user._doc,
                    password: undefined
                }
            })
        }
    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
}

export const login = async(req, res) => {
    const { userMail, userPwd } = req.body;
    const user = await User.findOne({email: userMail});
    if(user) {
        if (user.isVerified) {
            const hashedPwd = user.password;
            const encryption = await bcrypt.compare(userPwd, hashedPwd)
            
            if (encryption) {
                // Generating token and setting cookie
                generateTokenAndCookies(res, user._id);
                user.lastLogin = Date.now();
                await user.save();

                return res.status(200).json({
                    success: true, 
                    message: "Password Match",
                    user: {
                        ...user._doc,
                        password: undefined
                    }
                });
            } else {
                return res.status(400).json({success: false, message: "Wrong Password!"});
            }
        } else {
            return res.status(400).json({success: false, message: "Please verify you account and login!"});
        }
    } else {
        res.status(400).json({success: false, message: "Wrong EMAIL!"});
    }
}

export const logout = async(req, res) => {
    res.clearCookie("token");
    return res.status(200).json({success: true, message: "Logged Out successfully!"});
}

export const verifyMail = async(req, res) => {
    const { userCode } = req.body

    try {
        if(User.findOne({verificationToken: userCode})) {
            const user = await User.findOne({verificationToken: userCode});
            
            if(user.verificationTokenExpireAt >= Date.now()) {
                user.isVerified = true;
                user.verificationToken = undefined;
                user.verificationTokenExpireAt = undefined;
                await user.save();
                await sendVerificationMail(user.email, user.name);
                return res.status(201).json({
                    success: true,
                    message: "User Verified",
                    user: {
                        ...user._doc,
                        password: undefined
                    }
                })
            } else {
                return res.status(400).json({success: false, message: "Verification code expired! Please RE-REGISTER"});
            }
        } else {
            return res.status(400).json({success: false, message: "Wrong verification code!"});
        }
    } catch (error) {
        console.log(`Error finding user and sending mail\n: ${error}`);
        return res.status(400).json({success: false, message: error.message})
    }
}