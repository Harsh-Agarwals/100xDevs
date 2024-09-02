import express from 'express'
import {login, logout, signup, verifyMail} from "../controllers/auth.controllers.js"

const router = express();

router.post("/login", login);

router.post("/signup", signup);

router.post("/logout", logout);

router.post("/verify-email", verifyMail);

export default router;