import chai from 'chai';
import chaiHttp from 'chai-http';
import index from './index';

chai.should();
chai.use(chaiHttp);

describe('APIs', function () {
    it('/fetchHistory', function () {
        chai.request(index)
            .get('/fetchHistory')
            .end(function (err, res) {
                res.status.should.equal(200);
            })
    });

    it('Unsuccessful /addToHistory when no paramater is passed', function () {
        chai.request(index)
            .post('/addToHistory')
            .end(function (err, res) {
                res.status.should.equal(501);
            })
    });

    it('Unsuccessful /addToHistory when either parameter is passed', function () {
        chai.request(index)
            .post('/addToHistory')
            .send({ expression: "12+12" })
            .end(function (err, res) {
                res.status.should.equal(501);
            })
    });

    it('Unsuccessful /addToHistory when either parameter is passed', function () {
        chai.request(index)
            .post('/addToHistory')
            .send({ answer: 24 })
            .end(function (err, res) {
                res.status.should.equal(501);
            })
    });

    it('Successful /addToHistory when expression and answer is passed as parameter', function () {
        chai.request(index)
            .post('/addToHistory')
            .send({ expression: "12+12", answer: 24 })
            .end(function (err, res) {
                res.status.should.equal(201);
            })
    });
})