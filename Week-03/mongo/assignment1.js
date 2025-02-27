const dotenv = require("dotenv");
const connectToDB = require("./db/connectToDB.js");
const app = require("./app.js");
dotenv.config();

const PORT = process.env.PORT || 4000;

connectToDB()
.then(() => {
    console.log("Connected!");
    app.listen(PORT, () => {
        console.log(`Server UP and RUNNING at PORT ${PORT}`);
    })
})
.catch(e => {
    console.error(`Error: ${e}`);
})

