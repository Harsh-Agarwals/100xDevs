const jwt = require("jsonwebtoken");

const veriftJWT = (token, secretKey) => {
    if (jwt.verify(token, secretKey)) return true;
    return false
}

const v1 = veriftJWT("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkhhcnNoQGdtYWlsLmNvbSIsImlhdCI6MTc0MDI0NTUzMywiZXhwIjoxNzQwMjQ5MTMzfQ.XFNsJqGJSoiXXf9qCYPszPkga6X1WtEJMK4ZalgJIpY", "harsh-harsh")
console.log(v1);
