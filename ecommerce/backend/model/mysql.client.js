const mysql = require('mysql2/promise');

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "ecommerce",
    "waitForConnections": true,
    "connectionLimit": 0,
    "queueLimit": 10
}

const pool = mysql.createPool(dbConfig);
// const db = mysql.createConnection(dbConfig).then(
//     () => console.log('Connected to database')
// ).catch((err) => { console.log('Failed to connect to database'); });

// db.connect((err) => {
//     if (err)
//         console.log('Failed to connect to the database');
//     // throw err;
//     else
// console.log('db', db);
// });

module.exports = { dbPool: pool };