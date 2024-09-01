import {Router} from 'express';
const router = Router();

import mysqlConnection from "../database.js";

router.get('/categorias/:id', (req, res) =>{
    const { id }= req.params;
    mysqlConnection.query ('SELECT * FROM categorias WHERE id_categoria = ?', [id], (err, rows, fields) =>{
        if(!err){
            /*res.json(rows[0]);*/
            res.status(200).json(rows[0]);
        }else{
            console.log(err);   
        }
    });
});


router.get('/categorias/', (req, res) =>{
    const query ='SELECT * FROM categorias';
    mysqlConnection.query (query, (err, rows, fields) =>{
        if(!err){
            /*res.json(rows);*/
            res.status(200).json(rows);
        }else{
            console.log(err);
        }
    });
});

router.post('/categorias/', (req, res) =>{
    const nombre = req.body.nombre_categoria;
    const query =`INSERT IGNORE INTO categorias (nombre_categoria) VALUES (?)`;
    mysqlConnection.query (query,[nombre],(err, rows, fields) =>{          
        if(!err){
            res.json({Status: "Categoria Creada"});
            res.status(201).json({"Categoria Creada":res.affectedRows});
        }else{
            console.log(err);
        }
    });
});

router.delete('/categorias/:id', (req, res) =>{
    const { id }= req.params;
    const query =`DELETE FROM categorias WHERE id_categoria = ?`;
    mysqlConnection.query (query,[id],(err, rows, fields) =>{        
        if(!err){
            /*res.json({Status: "Categoria eliminada"});*/
            res.status(201).json({"Categoria eliminada":res.affectedRows});
        }else{
            console.log(err);
        }
    });
});


export default router;