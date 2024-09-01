import express from 'express';
import { PORT } from './config.js';

import routerCategorias from './routes/categorias.js';
import routerSubcategorias from './routes/subcategorias.js';
import routerGastos from './routes/gastos.js';
import routerIngresos from './routes/ingresos.js';

const app = express();

//Settings
app.set('port', PORT)

//Middelwares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
app.use(routerCategorias);
app.use(routerSubcategorias);
app.use(routerGastos);
app.use(routerIngresos);

//Starting the Server
app.listen(app.get('port'), ()=>{
    console.log("server on port", app.get('port'));
})

export default app;