const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();

const dbPool = mysql.createPool({
    host: "calculator-db",//host:"<Docker container name for Mysql>"
    user: "root",
    password: "pass",
    database: "calculator",
    "waitForConnections": true,
    "connectionLimit": 0,
    "queueLimit": 10
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Backend Server</h1>');
})

app.get('/fetchHistory', async (req, res) => {
    console.log('fetch history');
    try {
        const query = 'SELECT * FROM calculator_1;';
        const [result] = await dbPool.query(query);
        res.json(result);
    } catch (err) {
        console.log('err->', err);
    }
});

app.post('/addToHistory', async (req, res) => {
    console.log('add history');
    try {
        const { expression, answer } = req.body;
        if (expression && answer) {
            const query = 'INSERT INTO calculator_1(expression, answer) VALUES (?,?);';
            const result = await dbPool.query(query, [expression, answer]);
            if (!Array.isArray(result[0]) && result[0].insertId > 0)
                res.status(201).json({ success: true });
            else
                res.status(501).json({ success: false });
        }
        else
            res.status(501).json({ success: false });
    } catch (err) {
        res.status(501).json({ success: false });
        console.log('err->', err);
    }
});

app.listen(5000, '0.0.0.0', () => {
    console.log('listening on port 5000');
})