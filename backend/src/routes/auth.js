const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const signupValidate = require('../middlewares/signupValidate');
const authValidate = require("../middlewares/authValidate");
const User = require("../models/userSchema");
const verifyHeaders = require('../middlewares/verifyHeaders');
const z = require("zod");
const dotenv = require('dotenv');
const verifyRefreshHeaders = require('../middlewares/verifyRefreshHeaders');
dotenv.config();

// POST signup at /api/auth/signup

router.post('/signup', signupValidate, async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await User.findOne({ username });
        if (user) return res.status(400).json({'success': false, 'message': 'User already exists'});

        const hashedPwd = await bcrypt.hash(password, 10);

        const newUser = new User({
            username, email, password: hashedPwd
        });
        await newUser.save();

        const accessToken = jwt.sign({
            username
        }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1m'});
        const refreshToken = jwt.sign({
            username
        }, process.env.JWT_REFRESH_SECRET, { expiresIn: '5m'});
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 1000*60*5,
            secure: true,
            sameSite: 'Strict'
        });

        return res.status(201).json({
            'success': true,
            'message': 'User created successfully',
            "accessToken": accessToken
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            'success': false,
            'message': `Error: ${error}`
        });
    }
});

// POST login at /api/auth/login

router.post("/login", authValidate, async (req,res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({username});
        if (!user) return res.status(400).json({'success': false, 'message': 'User does not exist'});

        const pwdMatch = await bcrypt.compare(password, user.password);
        if (!pwdMatch) return res.status(400).json({'success': false, 'message': 'Invalid credentials'});

        const accessToken = jwt.sign({
            username
        }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1m'});
        const refreshToken = jwt.sign({
            username
        }, process.env.JWT_REFRESH_SECRET, { expiresIn: '5m'});
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 1000*60*5,
            secure: true,
            sameSite: 'Strict'
        });

        return res.status(201).json({
            'success': true,
            'message': 'User logged in successfully',
            "accessToken": accessToken
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            'success': false,
            'message': `Error: ${error}`
        });        
    }
});

// POST refresh to refresh token at /api/auth/refresh
router.post("/refresh", verifyRefreshHeaders, async ( req, res ) => {
    try {
        const username = req.user.username;

        const newAccessToken = jwt.sign({ username: username }, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '1m'
        });

        return res.status(201).json({
            'success': true,
            'message': 'Token refreshed successfully',
            'accessToken': newAccessToken
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            'success': false,
            'message': `Error: ${error}`
        });
    }
})

// POST logout to delete refresh token and access token at /api/auth/logout

router.post("/logout", verifyHeaders, async (req, res) => {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
        });

        return res.status(201).json({
            'success': true,
            'message': 'Logged out successfully!'
        })
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(404).json({
            'success': false,
            'message': `Error: ${error}`
        })
    }
});

// POST forgetpassword, will send password change link to user email, at /api/auth/forgetpassword
router.post("/forget-password", async (req, res) => {
    try {
        const {email} = req.body;
        if (!email) return res.status(401).json({'success': false, 'message': 'Missing email'});

        const emailSchema = z.string().email();
        const emailSParse = emailSchema.safeParse(email);
        if (!emailSParse.success) return res.status(404).json({'success': false, 'message': 'Please enter valid email'});

        const user = await User.findOne({email});
        if (!user) return res.status(401).json({'success': false, 'message': 'User DNE! Please enter valid email.'});

        const username = user.username;

        const resetToken = jwt.sign({ username }, process.env.JWT_RESET_SECRET, {expiresIn: '15m'});
        const validFor = new Date(Date.now() + 1000*60*15);

        await User.updateOne({
            username: username
        }, {
            $set: {
                resetToken: resetToken,
                resetTokenValidFor: validFor
            }
        });

        return res.status(201).json({
            'success': true,
            'message': 'Reset password initiated, please click on link sent on email specified to change the password.',
            'resetToken': resetToken
        })
    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(404).json({
            'success': false,
            'message': `Error ${e}`
        });
    }
});

// POST resetpassword, will verify user by accesstoken, and accept newpassword to change pwd, at /api/auth/resetpassword
router.post("/reset-password", async (req, res) => {
    try {
        const {resetToken, newPassword} = req.body;
        if (!newPassword || !resetToken) return res.status(401).json({'success': false, 'message': 'Please enter password and resetToken'});

        let decoded = jwt.verify(resetToken, process.env.JWT_RESET_SECRET);
        if (!decoded) return res.status(401).json({'success': false, 'message': 'Bad token'});

        const user = await User.findOne({ username:decoded.username, resetToken: resetToken });
        if (!user || user.resetTokenValidFor < new Date()) return res.status(401).json({'success': false, 'message': 'Invalid or expired token'});

        const pwdSchema = z.string().min(8).max(20);
        const pwdResult = pwdSchema.safeParse(newPassword);
        if (!pwdResult.success) return res.status(401).json({'success': false, 'message': 'Invalid password'});

        const hashedPwd = await bcrypt.hash(newPassword, 10);

        await User.updateOne({ username: decoded.username }, {
            $set: {password: hashedPwd},
            $unset: {refreshToken: "", resetTokenValidFor: ""}
        });

        const accessToken = jwt.sign({
            username: decoded.username
        }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1m'});
        const refreshToken = jwt.sign({
            username: decoded.username
        }, process.env.JWT_REFRESH_SECRET, { expiresIn: '5m'});
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 1000*60*5,
            secure: true,
            sameSite: 'Strict'
        });

        return res.status(201).json({
            'success': true,
            'message': 'Password reset successfully',
            "accessToken": accessToken
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(404).json({
            'success': false,
            'message': `Error ${error}`
        });
    }
});

// POST changepassword, will accept oldpassword and newpassword, with token to change password at /api/auth/changepassword
router.post("/change-password", verifyHeaders, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) return res.status(401).json({'success': false, 'message': 'Please enter old and new password'});

        const oldPwdSchema = z.string().min(8).max(20);
        const newPwdSchema = z.string().min(8).max(20);

        const passwordSchema = oldPwdSchema.safeParse(oldPassword).success && newPwdSchema.safeParse(newPassword).success

        if (!passwordSchema) return res.status(401).json({'success': false, 'message': 'Invalid password'});

        const hashedPwd = await bcrypt.hash(newPassword, 10);
        const username = req.user.username;

        await User.updateOne({ username: username }, {
            $set: {password: hashedPwd}
        })

        const accessToken = jwt.sign({
            username
        }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1m'});
        const refreshToken = jwt.sign({
            username
        }, process.env.JWT_REFRESH_SECRET, { expiresIn: '5m'});
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 1000*60*5,
            secure: true,
            sameSite: 'Strict'
        });

        return res.status(201).json({
            'success': true,
            'message': 'Password changed successfully',
            "accessToken": accessToken
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(404).json({
            'success': false,
            'message': `Error ${error}`
        });
    }
});

// GET getuser on /api/auth/user

router.get("/user", verifyHeaders, async (req, res) => {
    try {
        const username = req.user.username;

        const user = await User.findOne({ username: username });
        if (!user) return res.status(401).json({'success': false, 'message': 'User not found'});

        const userReturn = {
            'username': user.username,
            'email': user.email,
            'notes': user.notes
        }

        return res.status(201).json({
            'success': true,
            'message': 'User details extracted',
            'details': userReturn
        })
    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(401).json({
            'success': false,
            'message': `Error: ${e}`
        });
    }
});

// GET noteslist

module.exports = router;