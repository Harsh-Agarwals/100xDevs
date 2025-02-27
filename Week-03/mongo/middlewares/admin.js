const Admin = require("../models/AdminSchema");
const bcrypt = require("bcrypt");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    try {
        const {username, password} = req.headers;
        if (!username || !password) {
            return res.status(404).json({
                "success": "Failure",
                "message": `Error getting username or password from headers`
            })
        }

        const admin = await Admin.findOne({username: username});
        if (!admin) {
            return res.status(404).json({
                "success": false,
                "message": "User DNE!"
            })
        }

        let pwdEncrypt = bcrypt.compare(password, admin.password);
        if (!pwdEncrypt) {
            return res.status(401).json({
                "success": false,
                "message": "Bad credentials"
            })
        }

        next();
    } catch(e) {
        console.log("Admin auth middleware error");
        return res.status(404).json({
            "success": "Failure",
            "message": `Error: ${e}`
        })
    }
}

module.exports = adminMiddleware;