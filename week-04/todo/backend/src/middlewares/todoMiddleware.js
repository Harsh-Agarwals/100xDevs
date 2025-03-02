const jwt = require("jsonwebtoken");

const todoMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token || !token.startsWith('Bearer')) return res.status(404).json({'success': false, 'message': 'Wrong auth token!'});

        const verifyToken = token.split(' ')[1];
        const decode = jwt.verify(verifyToken, process.env.JWT_SECRET);
        if (!decode) return res.status(401).json({'success': false, 'message': 'User not authenticated'});

        req.user = decode;

        next();
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(401).json({
            'success': false,
            'message': `Error ${error}`
        });
    }
}

module.exports = todoMiddleware;