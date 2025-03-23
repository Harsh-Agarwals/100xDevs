const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyRefreshHeaders = (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) return res.status(401).json({
            'success': false,
            'message': 'User not authenticated, please login'
        });

        const tokenVerify = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        
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

module.exports = verifyRefreshHeaders;