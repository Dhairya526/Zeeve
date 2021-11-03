import express, { Request, Response } from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();

const dbPool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "calculator",
    "waitForConnections": true,
    "connectionLimit": 0,
    "queueLimit": 10
});

app.use(cors());
app.use(express.json());

app.get('/fetchHistory', async (req: Request, res: Response) => {
    console.log('fetch history');
    try {
        const query = 'SELECT * FROM calculator_1;';
        const [result]: any = await dbPool.query(query);
        res.json(result);
    } catch (err) {
        console.log(err);
    }
});

app.post('/addToHistory', async (req: Request, res: Response) => {
    console.log('add history');
    try {
        const { expression, answer } = req.body;
        const query = 'INSERT INTO calculator_1(expression, answer) VALUES (?,?);';
        const rows = await dbPool.query(query, [expression, answer]);
        if (!Array.isArray(rows[0]) && rows[0].insertId > 0)
            res.json({ success: true });
        else
            res.json({ success: false });
    } catch (err) {
        console.log(err);
    }
});

app.listen(5000, () => {
    console.log('listening on port 5000');
})