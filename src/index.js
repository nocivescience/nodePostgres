const express = require('express');
const {engine} = require('express-handlebars');
const app = express();
const db = require('./db');
const port = 3000;
app.set('views', './src/views');
app.use(express.urlencoded({extended: false}));
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: './src/views/layouts',
    partialsDir: './src/views/partials'
}));
app.set('view engine', 'hbs');
app.get('/', async(request, response) => {
    try{
      const query = await db.query('SELECT * FROM cuadernos');
      response.render('home', {cuadernos: query.rows});
    }catch(err){
      console.log(err);
    };
});
app.post('/formulario', async(request, response) => {
    try{
        const {asignatura, nota, titulo}= request.body;
        await db.query('INSERT INTO cuadernos (asignatura, nota, titulo) VALUES ($1, $2, $3)', [asignatura, nota, titulo]);
        response.redirect('/');
        console.log(`Se ha añadido el cuaderno de ${asignatura} con la nota ${nota} y el título ${titulo}`);
    }catch(err){
      console.log(`Sobreviví al error: ${err}`);
    }
});
app.use(express.json());
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});