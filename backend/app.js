const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require("./src/routes/auth");
const notesRoutes = require("./src/routes/notes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

module.exports = app;