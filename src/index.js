const db = require('./db');
const express = require('express');
const {engine}= require('express-handlebars');
const app = express();
const port = 3000;
app.set('views', './src/views');
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'principal',
}));
app.set('view engine', 'hbs');
app.get('/', async(req, res) => {
    try{
        const result = await db.query('SELECT * FROM cuadernos');
        res.render('home', {resultado: result.rows});
    }catch(e){
        console.log(e);
    }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));