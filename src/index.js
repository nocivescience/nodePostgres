const express = require('express');
const app = express();
const {Pool} = require('pg');
const port = 3000;
const pool= new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    port: "5432",
    password: 'comenius12',
});
app.get('/', (req, res) => {
    res.send('Hello World anni!');
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});