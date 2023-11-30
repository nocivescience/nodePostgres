const db = require('./db');
const express = require('express');
const {engine} = require('express-handlebars');
const app = express();
const port = 3000;
app.set('views', './src/views');
app.engine('.hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
}));
app.use(express.urlencoded({extended: true}));
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
app.post('/formulario', async(req, res)=>{
    const {asignatura, nota, titulo}= req.body;
    try{
        await db.query('INSERT INTO cuadernos (asignatura, nota, titulo) VALUES ($1, $2, $3)', [asignatura, nota, titulo]);
        res.redirect('/');
        console.log('insertado');
    }catch(error){
        console.log(`mira el error: ${error}`);
        res.status(500).send('Something went wrong');
    }
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});