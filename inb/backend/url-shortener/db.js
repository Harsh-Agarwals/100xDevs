import mysql from "mysql2"

// Creating new SQL connection
const connection = await mysql.createConnection({
    host: 'localhost',
    database: 'URL-shortener',
    user: 'root',
    password: 'password@123'
})

// Connect to database
connection.connect((error) => {
    if(error) {
        console.log(`Error connecting to the DB: ${error}`);        
    } else {
        console.log("DB connection successful!");
    }
})

module.exports = connection;