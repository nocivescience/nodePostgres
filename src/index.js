const db = require('./db');
const express = require('express');
const app = express();
const port = 3000;
app.get('/data', async(req, res) => {
    const respuesta = await db.query('SELECT * FROM cuadernos');
    res.json(respuesta.rows);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));