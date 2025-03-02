const jwt = require('jsonwebtoken');

const result = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkhhcnNoYWdhcndhbDMiLCJpYXQiOjE3NDA5MjUyMTJ9._VvEuI5Ldt1EJ9J420-VspRmSIwvJ0qBvlCIV0r1lnY", 'harshagarwal9835', (err, decoded) => {
    console.log(decoded);
});

