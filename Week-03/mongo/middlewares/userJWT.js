const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const UserJWTmiddleware = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({
                'success': false,
                'message': 'Bad Token!'
            });
        };
        token = token.split(" ")[1];

        let decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        
        // if(!jwtVerification) return res.status(404).json({'success': false, 'message': 'Wrong AUTH token'});

        next();
    } catch(e) {
        console.log(`Error ${e}`);
        return res.status(401).json({
            'success': false,
            'message': `Error: ${e}`
        })
    }
}

module.exports = UserJWTmiddleware;