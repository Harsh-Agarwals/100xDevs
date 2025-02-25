const express = require("express");

const app = express();

let numRequest = 0;
function requestCount (req, res, next) {
    numRequest += 1;
    console.log(numRequest);
    next();
}

app.use(requestCount);

app.get("/request-count", (req, res) => {
    res.json({
        "success": true,
        "request count": numRequest
    })
})

app.listen(3000, () => {
    console.log(`Server UP and RUNNING at PORT 3000`);
})