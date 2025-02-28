const express = require("express");
const userRouter = require("./routes/userRoutesJWT.js");
// const userRouter = require("./routes/userRoutes.js");

const adminRouter = require("./routes/adminRoutesJWT.js")
// const adminRouter = require("./routes/adminRoutes.js")

const app = express();
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);

module.exports = app;