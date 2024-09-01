import express from 'express'
import {login, logout, signup} from "../controllers/auth.controllers.js"

const router = express();

router.get("/login", login);

router.get("/signup", signup);

router.get("/logout", logout);

export default router;