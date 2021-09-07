const http = require('http');
const fs = require('fs');

const calcHtml = fs.readFileSync("../../1. HTML, CSS, Javascript/Calculator_Project/index.html");
const calcStyle = fs.readFileSync("../../1. HTML, CSS, Javascript/Calculator_Project/style.css");
const calcScript = fs.readFileSync("../../1. HTML, CSS, Javascript/Calculator_Project/script.js");

const cryptoHtml = fs.readFileSync("../../1. HTML, CSS, Javascript/CryptoConverter/index.html");
const cryptoStyle = fs.readFileSync("../../1. HTML, CSS, Javascript/CryptoConverter/style.css");
const cryptoScript = fs.readFileSync("../../1. HTML, CSS, Javascript/CryptoConverter/script.js");


const server = http.createServer((req, res)=>{
    console.log('request made');
    if(req.url == '/calculator'){
        res.writeHead(200, {"content-type":"text/html"});
        res.write(calcHtml);
        res.end();
    }
    if(req.url == '/style.css'){
        res.writeHead(200, {"content-type":"text/css"});
        res.write(calcStyle);
        res.end();
    }
    if(req.url == '/script.js'){
        res.writeHead(200, {"content-type":"text/javascript"});
        res.write(calcScript);
        res.end();
    }

    // if(req.url == '/crypto-converter'){
    //     res.writeHead(200, {"content-type":"text/html"});
    //     res.write(cryptoHtml);
    //     res.end();
    // }
    // if(req.url == '/style.css'){
    //     res.writeHead(200, {"content-type":"text/css"});
    //     res.write(cryptoStyle);
    //     res.end();
    // }
    // if(req.url == '/script1.js'){
    //     res.writeHead(200, {"content-type":"text/javascript"});
    //     res.write(cryptoScript);
    //     res.end();
    // }
})

server.listen(5000);