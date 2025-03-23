const express = require("express")
const {PORT} = require("./utils")
const z = require("zod")

const app = express()
// const schema = z.array(z.number())
// const schema = z.object({
//     email: z.email(),
//     password: z.string().min(8),
//     country: z.literal("IN").or(z.literal("US"))
// })

const schema = z.array(z.string())

// Middlewares and express app
app.use(express.json());

function checkUser(req, res, next) {
    let username = req.headers.username;
    let password = req.headers.password;
    if (username != 'harsh' || password != 'harshharsh') {
        res.status(403).send("Bad credentials");
    }
    next();
}

app.get("/health-check", checkUser, (req, res) => {
    const kidneyId = req.body.kidneyId;
    console.log(kidneyId);
    const response = schema.safeParse(kidneyId);
    console.log(response);
    if(response.success) {
        res.send({ message: `Health check successful ${response}`, kidneyId });
    } else {
        console.log("Error");
        
    }
    
    
})

// Middleware that gets raised in case of errors
// app.use((err, req, res, next) => {
//     res.json({
//         "message": "Sorry, something up with our server!"
//     })
// })

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})

