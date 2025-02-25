const express = require('express');

const app = express();

const requestCount = {};
const timeTrack = {};

const timer = (userId) => {
    for (let i=0;i<60;i++) {
        setTimeout(() => {
            timeTrack[userId] += 1;
        }, i*1000);
    }
}

const rateLimiter = (req, res, next) => {
    let userId = req.params.userId;
    if (requestCount[userId] === undefined) {
        requestCount[userId] = 1;
        timeTrack[userId] = 0;
        timer(userId);
    } else {
        if ((requestCount[userId] >= 4 && timeTrack[userId] < 59)) {
            requestCount[userId] = 5;
            return res.json({"Status": "Enough calls"})
        } else {
            if (timeTrack[userId] > 59) {
                timeTrack[userId] = 0;
                timer(userId);
                requestCount[userId] = 1;
            } else {
                requestCount[userId] += 1;
            }
        }
    }
    next();
}

app.use(['/user/:userId', '/todo/:userId', '/drinks/:userId'], rateLimiter);

app.get("/user/:userId", (req, res) => {
    let userId = req.params.userId;
    console.log("In user");
    res.json({
        "requestCount": requestCount[userId],
        "requestCountDict": requestCount,
        "timetrack": timeTrack
    })
})
app.get("/todo/:userId", (req, res) => {
    let userId = req.params.userId;
    console.log("In Todo");
    res.json({
        "requestCount": requestCount[userId],
        "requestCountDict": requestCount,
        "timetrack": timeTrack
    })
})
app.get("/drinks/:userId", (req, res) => {
    let userId = req.params.userId;
    console.log("In Drinks");
    res.json({
        "requestCount": requestCount[userId],
        "requestCountDict": requestCount,
        "timetrack": timeTrack
    })
})

app.listen(3000, () => {
    console.log(`App UP and Running at PORT 3000`);
})