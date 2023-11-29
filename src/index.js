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
app.set('view engine', 'hbs');
app.get('/data', async(req, res) => {
    const datos = await db.query('SELECT * FROM cuadernos');
    res.render('inicio', {datos: datos.rows});
});
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});