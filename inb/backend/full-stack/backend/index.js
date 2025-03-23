import express from 'express'
import dotenv from 'dotenv'
// import cors from 'cors'
dotenv.config();

const PORT = process.env.PORT;

const app = express();

// app.use(cors());
// app.use(express.static('dist'));
app.use(express.json());

app.get("/user/:id", (req, res) => {
    let id = req.params.id;
    console.log(id);    
    res.send(`ID of the user is ${id}`);
})

app.get('/api/jokes', (req, res) => {
    const jokes = [
        {
            'joke_id': 1,
            'joke': 'joke joke'
        },
        {
            'joke_id': 2,
            'joke': 'joke joke joke'
        },
        {
            'joke_id': 3,
            'joke': 'joke'
        }
    ]
    res.send(jokes);
})

app.listen(PORT, (req, res) => {
    console.log(`Server UP and RUNNING at PORT ${PORT}`);
})