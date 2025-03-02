const app = require("./app.js");
const connectDB = require("./src/db/db.js");
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;

const startApp = async () => {
    try {
        await connectDB();
        console.log("Connected to DB");
        app.listen(PORT, () => {
            console.log(`Server UP and RUNNING on PORT: ${PORT}`);
        });
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

startApp();

