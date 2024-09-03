import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export const verifyToken = async(req, res, next)=> {
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({success: false, message: "unauthorised - no token found!"});
    }
    try {
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        if(!decode) {
            return res.status(400).json({success:false, message: "unauthorised token"});
        }
        req.userID = decode.userID;
        next();
    } catch (error) {
        console.log("Error in verifying token", error);
        return res.status(400).json({success: false, message: "Error in verifying token"});        
    }
}