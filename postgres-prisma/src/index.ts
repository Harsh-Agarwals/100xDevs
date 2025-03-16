import { Client, Query } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const POSTGRES_URL = process.env.POSTGRES_URL;
const client = new Client({
    connectionString: POSTGRES_URL
});

async function createTable() {
    try {
        const result = await client.query(`
            CREATE TABLE Users3 (
            userId SERIAL PRIMARY KEY, 
            firstName VARCHAR(25) NOT NULL, 
            lastName VARCHAR(25), 
            email VARCHAR(50) NOT NULL,
            password VARCHAR(30) NOT NULL, 
            phoneNumber VARCHAR(10)
        )`);
        console.log("Table Users3 successfully created!");
        console.log(result);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

async function createAddressTable() {
    try {
        const createTable = await client.query(`
            CREATE TABLE Address (
                id SERIAL PRIMARY KEY,
                userId INT REFERENCES Users3(userId),
                street VARCHAR(100),
                city VARCHAR(50),
                pincode INT,
                state VARCHAR(50),
                country VARCHAR(40)
            )    
        `);
        console.log("Address table created");
        console.log(createTable);        
    } catch (error) {
        console.log(`Error creating Address DB: ${error}`);
    }
}

async function addAddressData() {
    try {
        let query = `
            INSERT INTO Address (userId, street, city, pincode, state, country)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        let value = [[2, 'abc def', 'delhi', 163135, 'Delhi', 'India'], [2, 'bnju bradf', 'Wellington', 13634, 'Wellington', 'NZ'], [3, 'Wonder Street', 'NYC', 11061, 'NY', 'USA']];
        for (let i=0;i<value.length;i++) {
            await client.query(query, value[i]);
            console.log(`Address for ${i} successfully inserted in DB`);
        }
        return {'success': true}
    } catch (error) {
        console.log(`Error insertion: ${error}`);
    }
}

async function getData(tableName: String) {
    try {
        const data = await client.query(`
            SELECT * FROM ${tableName}
        `);
        return data;
    } catch (error) {
        console.log(`Error in getting data: ${error}`);
    }
};

async function insertData() {
    try {
        const query = `
            INSERT INTO Users3 (firstName, lastName, email, password, phoneNumber)
            VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [['Harsh', 'Agarwal', 'harshagarwal983@gmail.com', 'harsh@#%123', '6854946783'], ['Harsha', 'Agarwalll', 'harshagarwal9835@gmail.com', 'harsh@#%123', '6586913611']]
        for (let i=0;i<values.length;i++) {
            let result = await client.query(query, values[i]);
            console.log(`Successfully inserted value ${i} in the table!`);
        }
        return {'success': true};
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

async function ConnectToDB() {
    try {
        await client.connect();
        console.log('Successfully connected to Postgres DB');
        createTable();
        const data = await getData("Users3");
        console.log(`data: ${JSON.stringify(data?.rows)}`);
        // const insertion = await insertData();
        // console.log(insertion?.success);
        const data2 = await getData("Users3");
        console.log(`data: ${JSON.stringify(data2?.rows)}`);
    } catch (error) {
        console.log(`Error connecting to Postgres: ${error}`);
        process.exit(1);
    }
};

async function connectAdd() {
    try {
        createAddressTable();
        console.log("Address table created successfully");
        // const insertion = await addAddressData();
        // console.log(insertion?.success);
        const data = await getData("Address");
        console.log(`Data: ${JSON.stringify(data?.rows)}`);        
    } catch (error) {
        console.log(`Error in Add: ${error}`);
        process.exit(1);
    }
}

async function getUser(email: string) {
    await ConnectToDB();
    let query = `SELECT * FROM Users3 WHERE email=$1`;
    let value = [email];
    const user = await client.query(query, value);
    console.log(`user ${JSON.stringify(user.rows)}`);    
    return user;
}


// getUser("harshagarwal9835@gmail.com");
// connectAdd();

// Joins
async function joinData() {
    await ConnectToDB();
    await connectAdd();
    console.log('hasdfasd');
    
    let query = `
        SELECT u.userId, u.email, u.firstName, a.state, a.country FROM Users3 AS u
        INNER JOIN Address AS a
        ON u.userId = a.userId
    `;
    const res = await client.query(query);
    console.log(res?.rows);    
}

joinData();