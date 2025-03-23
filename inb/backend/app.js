const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require("./src/routes/auth");
const notesRoutes = require("./src/routes/notes");
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

module.exports = app;