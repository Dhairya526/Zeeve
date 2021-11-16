"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const index_1 = __importDefault(require("./index"));
chai_1.default.should();
chai_1.default.use(chai_http_1.default);
describe('APIs', function () {
    it('/fetchHistory', function () {
        chai_1.default.request(index_1.default)
            .get('/fetchHistory')
            .end(function (err, res) {
            res.status.should.equal(200);
        });
    });
    it('Unsuccessful /addToHistory when no paramater is passed', function () {
        chai_1.default.request(index_1.default)
            .post('/addToHistory')
            .end(function (err, res) {
            res.status.should.equal(501);
        });
    });
    it('Unsuccessful /addToHistory when either parameter is passed', function () {
        chai_1.default.request(index_1.default)
            .post('/addToHistory')
            .send({ expression: "12+12" })
            .end(function (err, res) {
            res.status.should.equal(501);
        });
    });
    it('Unsuccessful /addToHistory when either parameter is passed', function () {
        chai_1.default.request(index_1.default)
            .post('/addToHistory')
            .send({ answer: 24 })
            .end(function (err, res) {
            res.status.should.equal(501);
        });
    });
    it('Successful /addToHistory when expression and answer is passed as parameter', function () {
        chai_1.default.request(index_1.default)
            .post('/addToHistory')
            .send({ expression: "12+12", answer: 24 })
            .end(function (err, res) {
            res.status.should.equal(201);
        });
    });
});
