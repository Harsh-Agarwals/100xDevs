const express = require("express")
const {PORT} = require("./utils")

const app = express()

// Middlewares and express app

function checkUser(req, res, next) {
    let username = req.headers.username;
    let password = req.headers.password;
    if (username != 'harsh' || password != 'harshharsh') {
        res.status(403).send("Bad credentials");
    }
    next();
}

app.get("/health-check", checkUser, (req, res) => {
    const kidneyId = req.query.kidneyId;
    res.send({ message: "Health check successful", kidneyId });
})

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
    
})

