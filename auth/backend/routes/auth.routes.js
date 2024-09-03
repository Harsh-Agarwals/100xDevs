import express from 'express'
import {login, logout, signup, verifyMail, forgetPassword, resetPassword, checkAuth} from "../controllers/auth.controllers.js"
import { verifyToken } from '../middleware/verifyToken.js';

const router = express();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/login", login);

router.post("/signup", signup);

router.post("/logout", logout);

router.post("/verify-email", verifyMail);

router.post("/forget-password", forgetPassword);

router.post("/reset-password/:token", resetPassword); // token to be accessed by req.params

export default router;