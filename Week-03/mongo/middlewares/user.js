const User = require("../models/UserSchema.js");
const bcrypt = require("bcrypt");

// Middleware for handling auth
async function userMiddleWare(req, res, next) {
    try {
        const { username, password } = req.headers;
        if (!username || !password) {
            return res.status(404).json({
                "success": false,
                "message": "Error getting password or username from headers"
            })
        }
        
        const user = await User.findOne({username: username});
        if (!user) {
            return res.status(404).json({
                "success": false,
                "message": "User DNE!"
            })
        }

        const pwdEncrypt = bcrypt.compare(password, user.password);
        if(!pwdEncrypt) {
            return res.status(404).json({
                "success": false,
                "message": "Incorrect credentials"
            })
        }

        next();
    } catch (error) {
        console.log("User Auth Middleware error");
        return res.status(401).json({
            "success": false,
            "message": `Error: ${error}`
        })
    }
}

module.exports = userMiddleWare;