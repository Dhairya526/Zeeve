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

module.exports = { dbPool: pool };