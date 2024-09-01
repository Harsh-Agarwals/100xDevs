import mongoose from "mongoose";
import dotenv from 'dotenv'

export default async function ConnectDb() {
    try {
        dotenv.config();
        console.log('URI:', process.env.MONGODB_URI);
        // mongoose.connect(process.env.MONGODB_URI).then(() => {
        //     console.log(`Connected to DB`);
        // }).catch(e => {
        //     console.log(`Error: ${e}`);
        // })
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connecting status: ${connect.connection.readyState}`); // 1:running, 0:failure
        console.log(`Connecting host: ${connect.connection.host}`);
    } catch (error) {
        console.log(`Error connecting to the MongoDb Database: ${error}`);
    }
}