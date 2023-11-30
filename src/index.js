const express = require('express');
const {engine} = require('express-handlebars');
const db = require('./db');
const app = express();
const port = 3000;
app.set('views', './src/views');
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'default',
}));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'hbs');
app.get('/', async(req, res) => {
    const datos = await db.query('SELECT * FROM cuadernos');
    res.render('inicio', {datos: datos.rows});
});
app.post('/formulario', async(req, res) => {
    const {asignatura, nota, titulo} = req.body;
    try{
        await db.query('INSERT INTO cuadernos (asignatura, nota, titulo) VALUES ($1, $2, $3)', [asignatura, nota, titulo]);
        res.redirect('/');
        console.log('Datos insertados');
    }catch(e){
        console.log(`Error feliz: ${e}`);
    }
});
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});