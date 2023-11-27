const express = require('express');
const db = require('./db');
const app = express();
const port = 3000;
app.get('/data', async(req, res) => {
    const datos = await db.query('SELECT * FROM cuadernos');
    res.json(datos.rows);
});
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});