const express = require('express');
const app = express();
const db = require('./db');
const {engine} = require('express-handlebars');
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('views', './src/views');
app.engine('.hbs', engine({
  defaultLayout: 'main',
  extname: '.hbs',
}));
app.set('view engine', '.hbs');
app.get('/', (req, res) => {
  const datas = db.query('SELECT * FROM cuadernos', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.render('home', {datas: result.rows});
    }
  });
});
app.post('/formulario', async(req, res) => {
    const {asignatura, nota, titulo} = req.body;
    try{
        await db.query('INSERT INTO cuadernos (asignatura, nota, titulo) VALUES ($1, $2, $3)', [asignatura, nota, titulo]);
        res.redirect('/');
        console.log('datos insertados');
    }catch(err){
        console.log(`error de coronavirus ${err}`);
        res.status(500).send('Error de coronavirus');
    }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));