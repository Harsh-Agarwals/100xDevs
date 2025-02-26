const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "*"
}))

app.get("/sum", (req, res) => {
    let a = parseInt(req.query.a);
    let b = parseInt(req.query.b);
    let result = a+b;
    res.send(result.toString());
})

app.listen(3000);