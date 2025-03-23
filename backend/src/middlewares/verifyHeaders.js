const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyHeaders = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        
        if (!token || !token.startsWith("Bearer")) return res.status(401).json({
            'success': false,
            'message': 'Invalid token'
        });

        const accessToken = token.split(" ")[1];
        
        if (!accessToken) return res.status(401).json({
            'success': false,
            'message': 'Invalid token on split'
        });

        const tokenVerify = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        if (!tokenVerify) return res.status(401).json({
            'success': false,
            'message': 'Invalid token, unable to verify'
        });

        req.user = tokenVerify;
        next();
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            'success': false,
            'message': `Error: ${error}`
        });
    }
}

module.exports = verifyHeaders;