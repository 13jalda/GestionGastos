const express = require('express');
const app = express();

//Settings
app.set('port', process.env.PORT || 3000)

//Middelwares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
app.use(require('./routes/categorias'));
app.use(require('./routes/subcategorias'));
app.use(require('./routes/gastos'));
app.use(require('./routes/ingresos'));

//Starting the Server
app.listen(app.get('port'), ()=>{
    console.log("server on port", app.get('port'));
})

module.exports = app;