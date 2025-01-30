const express = require("express");

const app = express()
const port = 3000 || process.env.PORT


app.get('/', (req, res) => {
    res.send("Hello, Harsh!");
})

app.get('/name', (req, res) => {
    const status = {
        "status": "running"
    }
    res.send(status);
})

app.listen(port, () => {
    console.log(`Server Up and running at PORT ${port}`);    
})