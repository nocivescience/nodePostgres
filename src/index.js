const express=require('express');
const app=express();
const db=require('./db');
const {engine}= require('express-handlebars');
app.set('port',process.env.PORT||3000);
app.set('views',  './src/views');
app.engine('hbs',engine({extname:'hbs',defaultLayout:'main'}));
app.set('view engine','hbs');
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.get('/', async(req,res)=>{
    const response=await db.query('SELECT * FROM cuadernos');
    res.render('inicio', {response: response.rows});
});
app.post('/login', async(req,res)=>{
    try{
        const {asignatura, nota, titulo}=req.body;
        await db.query('INSERT INTO cuadernos(asignatura, nota, titulo) VALUES($1,$2,$3)',[asignatura, nota, titulo]);
        res.redirect('/');
        console.log('Registro exitoso');
    }catch(e){
        console.log(`Error aqui: ${e}`);
        res.status(500).json({
            message: 'Error en el servidor'
        })
    }
});
app.listen(app.get('port'),()=>{
    console.log('Server is running on port '+app.get('port'));
});
