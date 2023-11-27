const db = require('./db');
const express = require('express');
const app = express();
const {Pool} = require('pg');
const port = 3000;
app.get('/data', async(req, res)=>{
    try{
        const result= await db.query('SELECT * FROM cuadernos'); 
        res.send(result.rows);
    }catch(e){
        console.log(e);
        res.status(500).send('Something went wrong');
    }
}); 
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});