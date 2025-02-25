const express = require("express");

const app = express();

app.get("/user", (req, res) => {
    let a;
    console.log(a.length);
});

let errorCount = 0;
app.use((err, req, res, next) => {
    errorCount += 1
    res.status(404).json({
        "Success": false,
        "ErrorCount": errorCount
    })
})

app.listen(3000);