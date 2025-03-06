const app = require("./app");
const connectDB = require("./src/db/connectDB");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await connectDB();
        console.log("Connected to DB");
        app.listen(PORT, () => {
            console.log(`Server UP and RUNNING at PORT ${PORT}`);
        });
    } catch (error) {
        console.error(`Error connecting to DB: ${error}`);
    }
}

startServer();