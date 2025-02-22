const z = require('zod');
const jwt = require("jsonwebtoken");

function decodeJWT(token) {
    if (jwt.decode(token)) return true;
    return false;
}

const dc1 = decodeJWT("asf634.dfsbhfi467.ahbhi4");
console.log(dc1);
