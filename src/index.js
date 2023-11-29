const express = require('express');
const app = express();
const db = require('./db');
const port = 3000;
app.get('/', async(request, response) => {
    try{
      const query = await db.query('SELECT * FROM cuadernos');
      response.json(query.rows);
    }catch(err){
      console.log(err);
    };
});
app.use(express.json());
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});