const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to Mongo DB");
    } catch (error) {
        console.error(`Error connecting to DB: ${error}`);
    }
}

module.exports = connectToDB;