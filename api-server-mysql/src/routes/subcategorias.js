import {Router} from 'express';
const router = Router();

import mysqlConnection from "../database.js";

router.get('/subcategorias/:id', (req, res) =>{
    const { id }= req.params;
    mysqlConnection.query ('SELECT sc.id_subcategoria, c.nombre_categoria, sc.nombre_subcategoria FROM subcategorias sc INNER JOIN categorias c ON sc.id_categoria_subcat = c.id_categoria WHERE sc.id_subcategoria = ?', [id], (err, rows, fields) =>{
        if(!err){
            /* res.json(rows[0]);*/
            res.status(200).json(rows[0]);
        }else{
            console.log(err);
        }
    });
});


router.get('/subcategorias/', (req, res) =>{
    const query ='SELECT sc.id_subcategoria, c.nombre_categoria, sc.nombre_subcategoria FROM subcategorias sc INNER JOIN categorias c ON sc.id_categoria_subcat = c.id_categoria';
    mysqlConnection.query (query, (err, rows, fields) =>{
        if(!err){
            /* res.json(rows[0]);*/
            res.status(200).json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

router.post('/subcategorias/', (req, res) =>{
    const nombre = req.body.nombre_subcategoria;
    const id_categoria = req.body.id_categoria;
    const query =`INSERT INTO subcategorias (nombre_subcategoria, id_categoria_subcat) VALUES (?,?)`;
    mysqlConnection.query (query,[nombre, id_categoria],(err, rows, fields) =>{        
        if(!err){
            /*res.json({Status: "Subcategoria Creada"});*/
            res.status(201).json({"Subcategoria Creada":res.affectedRows});
        }else{
            console.log(err);
        }
    });
});

router.delete('/subcategorias/:id', (req, res) =>{
    const { id }= req.params;
    const query =`DELETE FROM subcategorias WHERE id_subcategoria = ?`;
    mysqlConnection.query (query,[id],(err, rows, fields) =>{        
        if(!err){
            /*res.json({Status: "Subcategoria eliminada"});*/
            res.status(201).json({"Subcategoria eliminada":res.affectedRows});
        }else{
            console.log(err);
        }
    });
});


export default router;