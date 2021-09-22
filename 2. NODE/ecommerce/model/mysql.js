const mysql = require('mysql');

//database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

const runQuery = (sql) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results, fields) => {
            if (err)
                return reject(err);
            else
                return resolve(results);
        });
    });
};


module.exports.runQuery = runQuery;