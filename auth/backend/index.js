import express from 'express';
import ConnectDb from './db/connectDB.js'
import cookieParser from 'cookie-parser'
import router from './routes/auth.routes.js';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json()) // parse incoming request in req.body in json
app.use(cookieParser()) // allows us to parse the incoming cookies

app.use("/api/auth", router);

app.listen(port, () => {
    ConnectDb();
    console.log(`Server UP and RUNNING at port ${port}`);
})