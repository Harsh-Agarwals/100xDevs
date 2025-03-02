const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { COLLECTION } = require("../utils/constants.js");
dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017";

const connectDB = async () => {
    try {
        let connection = await mongoose.connect(`${MONGO_URL}/${COLLECTION}`)
        console.log("Database connected successfully");
        console.log(`HOST: ${connection.connection.host}`);
    } catch (error) {
        console.error(`Error ${error}`);
        process.exit(1);
    }
}

module.exports = connectDB;
