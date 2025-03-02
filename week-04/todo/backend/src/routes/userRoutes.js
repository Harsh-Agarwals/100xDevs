const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema.js");
const bcrypt = require("bcrypt");
const signUpAuth = require("../middlewares/bodyAuth.js");
const bodyAuth = require("../middlewares/bodyAuth.js");
const jwt = require("jsonwebtoken");
const userVerifyLogin = require("../middlewares/userVerify.js");
const Todo = require("../models/TodoSchema.js");

router.post("/signup", signUpAuth, async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const findUser = await User.findOne({ username });

        if (findUser) return res.status(401).json({ 'success': false, 'message': 'User already exists' });

        let hashedPwd = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPwd });

        await newUser.save();

        return res.status(201).json({
            'success': true,
            'message': 'User created successfully'
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            'success': false,
            'message': `Error in signup: ${error}`
        });
    }
});

router.post("/login", bodyAuth, async (req, res) => {
    try {
        const { username, password } = req.body;

        const findUser = await User.findOne({ username });

        if (!findUser) return res.status(401).json({ 'success': false, 'message': 'User DNE!' });

        const isVerify = await bcrypt.compare(password, findUser.password);
        if (!isVerify) return res.status(401).json({ 'success': false, 'message': 'Wrong Password' });

        // const token = jwt.sign({ username }, process.env.JWT_SECRET);

        // Access and refresh token
        const accessToken = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '15m'});
        const refreshToken = jwt.sign({ username }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d'});

        console.log(refreshToken);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 1000*60*60*24*7,
            secure: true,
            sameSite: 'Strict'
        })

        return res.status(201).json({
            'success': true,
            'message': 'User logged in successfully',
            // 'token': token
            'accessToken': accessToken
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            'success': false,
            'message': `Error in login: ${error}`
        });
    }
});

// Refreshing token
router.post("/refresh", async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json({ 'success': false, 'message': 'User not authenticated' });

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) return res.status(401).json({ 'success': false, 'message': 'User not authenticated' });
            const newAccessToken = jwt.sign({ username: decoded.username }, process.env.JWT_SECRET, {
                expiresIn: '15m'
            });

            return res.status(201).json({
                'success': true,
                'message': 'Access Token renewed successfully',
                'accessToken': newAccessToken
            });
        })
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            'success': false,
            'message': `Error in login: ${error}`
        });
    }
})

router.post("/logout", (req, res) => {
    try {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
        });
        return res.status(201).json({
            'success': true,
            'message': 'User logged out successfully. Please remove token from client storage.'
        })
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            'success': false,
            'message': `Error in logout: ${error}`
        });
    }
    // Handle user logout
});

router.get("/todos", userVerifyLogin, async (req, res) => {
    try {
        const { username } = req.user;
        const user = await User.findOne({ username });
        const todos = user.todos;
        return res.status(200).json({
            'success': true,
            'message': 'Todos fetched successfully',
            'todos': todos
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            'success': false,
            'message': `Error in fetching todos: ${error}`
        });
    }
});

router.post("/todos/create", userVerifyLogin, async (req, res) => {
    try {
        const { username } = req.user;
        const { title, description, status } = req.body;
        const user = await User.findOne({ username });

        const todo = new Todo({
            title, description, status
        });
        await todo.save();

        await user.updateOne({
            "$push": {
                todos: todo._id
            }
        });

        return res.status(201).json({
            'success': true,
            'message': 'Todo created successfully'
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            'success': false,
            'message': `Error in creating todo: ${error}`
        });
    }
});

module.exports = router;