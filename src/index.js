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
app.use(express.urlencoded({extended: false}));
app.get('/', async(req, res) => {
    try{
        const result = await db.query('SELECT * FROM cuadernos');
        res.render('home', {resultado: result.rows});
    }catch(e){
        console.log(e);
    }
});
app.post('/formulario', async(req, res) => {
    try{
        const {asignatura, nota, titulo} = req.body;
        await db.query('INSERT INTO cuadernos (asignatura, nota, titulo) VALUES ($1, $2, $3)', [asignatura, nota, titulo]);
        res.status(200).send('Se ha insertado correctamente');
        console.log('Se ha insertado correctamente');
    }catch(e){
        console.log(`Error en el post: ${e}`);
    }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));