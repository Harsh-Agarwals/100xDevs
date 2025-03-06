const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function connectDB() {
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_PROJECT_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Successfully connected to MongoDB");
        console.log(`Connection: ${connection.connection.host}`);
    } catch (error) {
        console.log(`Error ${error}`);
        process.exit(1);        
    }    
}

module.exports = connectDB;