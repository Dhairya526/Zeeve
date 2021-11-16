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

app.get('/', (req, res) => {
    res.send('hii');
})
app.get('/fetchHistory', async (req: Request, res: Response) => {
    console.log('fetch history');
    try {
        const query = 'SELECT * FROM calculator_1;';
        const [result] = await dbPool.query(query);
        res.json(result);
    } catch (err) {
        console.log('err->', err);
    }
});

app.post('/addToHistory', async (req: Request, res: Response) => {
    console.log('add history');
    try {
        console.log(req.body);
        const { expression, answer } = req.body;
        if (expression && answer) {
            console.log(req.body);
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

app.listen(5000, () => {
    console.log('listening on port 5000');
})

export default app;