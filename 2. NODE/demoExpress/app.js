const express = require('express')
const app = express()

app.get('/', (req,res)=>{
    res.send('Hii');
})

app.use(express.static('public'));

app.get('/calculator',(req,res)=>{
    res.status(200).sendFile(`${__dirname}/public/calculator.html`);
})

app.get('/cryptoconverter',(req,res)=>{
    res.status(200).sendFile(`${__dirname}/public/cryptoConverter.html`);
})

app.get('*', (req,res)=>{
    res.status(404).send("<h1>404 Page not found!!</h1>");
})
app.listen(5000, ()=>{
    console.log("Listening on port 5000");
})