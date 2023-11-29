const db = require('./db');
const express = require('express');
const {engine} = require('express-handlebars');
const app = express();
const {Pool} = require('pg');
const port = 3000;
app.set('views', './src/views');
app.engine('.hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
}));
app.set('view engine', '.hbs');
app.get('/', async(req, res)=>{
    try{
        const result= await db.query('SELECT * FROM cuadernos'); 
        res.render('inicio', {result: result.rows});
    }catch(e){
        console.log(e);
        res.status(500).send('Something went wrong');
    }
}); 
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});