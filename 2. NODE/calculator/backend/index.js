"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promise_1 = __importDefault(require("mysql2/promise"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const dbPool = promise_1.default.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "calculator",
    "waitForConnections": true,
    "connectionLimit": 0,
    "queueLimit": 10
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('hii');
});
app.get('/fetchHistory', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('fetch history');
    try {
        const query = 'SELECT * FROM calculator_1;';
        const [result] = yield dbPool.query(query);
        res.json(result);
    }
    catch (err) {
        console.log('err->', err);
    }
}));
app.post('/addToHistory', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('add history');
    try {
        console.log(req.body);
        const { expression, answer } = req.body;
        if (expression && answer) {
            console.log(req.body);
            const query = 'INSERT INTO calculator_1(expression, answer) VALUES (?,?);';
            const result = yield dbPool.query(query, [expression, answer]);
            if (!Array.isArray(result[0]) && result[0].insertId > 0)
                res.status(201).json({ success: true });
            else
                res.status(501).json({ success: false });
        }
        else
            res.status(501).json({ success: false });
    }
    catch (err) {
        res.status(501).json({ success: false });
        console.log('err->', err);
    }
}));
app.listen(5000, () => {
    console.log('listening on port 5000');
});
exports.default = app;
