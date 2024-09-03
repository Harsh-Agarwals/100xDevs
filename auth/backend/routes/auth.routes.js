import express from 'express'
import {login, logout, signup, verifyMail, forgetPassword, resetPassword} from "../controllers/auth.controllers.js"

const router = express();

router.post("/login", login);

router.post("/signup", signup);

router.post("/logout", logout);

router.post("/verify-email", verifyMail);

router.post("/forget-password", forgetPassword);

router.post("/reset-password/:token", resetPassword); // token to be accessed by req.params

export default router;