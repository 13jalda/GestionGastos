import {Router} from 'express';
const router = Router();

import mysqlConnection from "../database.js";

router.get('/gastos/:id', (req, res) =>{
    const { id } = req.params;
    const id_user = req.body.id_user;
    console.log (req.body);
    const query = `SELECT * FROM gastos WHERE id_gasto = ? AND id_usuario_gasto = ?`

    mysqlConnection.query (query, [id,id_user], (err, rows, fields) =>{
        if(!err){
           /* res.json(rows[0]);*/
            res.status(200).json(rows[0]);
        }else{
            console.log(err);
        }
    });
});


router.get('/gastos/', (req, res) =>{
    const id_user = req.body.id_user;
    console.log (req.body);
    const query =`SELECT g.id_gasto, g.fecha_gasto, g.importe_gasto, sc.nombre_subcategoria, c.nombre_categoria
                    FROM gastos g
                    JOIN subcategorias sc
                    ON g.id_subcat_gasto = sc.id_subcategoria
                    JOIN categorias c
                    ON c.id_categoria = sc.id_categoria_subcat
                    WHERE g.id_usuario_gasto = ?`;

    mysqlConnection.query (query, [id_user], (err, rows, fields) =>{
        if(!err){
            res.json(rows);
            /*res.status(200).json(res);*/
        }else{
            console.log(err);
        }
    });
});


router.get('/gastoscategoria/:id', (req, res) =>{
    const { id } = req.params;
    const id_user = req.body.id_user;
    console.log (req.body);
    const query =`SELECT g.id_gasto, g.fecha_gasto, g.importe_gasto, sc.nombre_subcategoria, c.nombre_categoria
                    FROM gastos g
                    JOIN subcategorias sc
                    ON g.id_subcat_gasto = sc.id_subcategoria
                    JOIN categorias c
                    ON c.id_categoria = sc.id_categoria_subcat
                    WHERE g.id_usuario_gasto = ? AND c.id_categoria = ?`;

    mysqlConnection.query (query, [id_user, id], (err, rows, fields) =>{
        if(!err){
            res.json(rows);
            /*res.status(200).json(res);*/
        }else{
            console.log(err);
        }
    });
});


router.post('/gastos/', (req, res) =>{
    let fecha = req.body.fecha;
    const importe = req.body.importe_gasto;
    const id_subcat = req.body.id_subcategoria;
    const id_user = req.body.id_user;

    if (fecha === ""){
        fecha = new Date();
        /*fecha = "CURDATE()";*/
    }

    const query =`INSERT INTO gastos (fecha_gasto, importe_gasto, id_subcat_gasto, id_usuario_gasto) 
                    VALUES (?,?,?,?)`;
    mysqlConnection.query (query,[fecha,importe,id_subcat,id_user],(err, rows, fields) =>{        
        if(!err){
            res.json({Status: "Gasto añadido"});
            /*res.status(201).json({"Gasto Creado":res.affectedRows});*/
        }else{
            console.log(err);
        }
    });
});

router.delete('/gastos/:id', (req, res) =>{
    const { id }= req.params;
    const query =`DELETE FROM gastos WHERE id_gasto = ?`;
    mysqlConnection.query (query,[id],(err, rows, fields) =>{        
        if(!err){
            res.json({Status: "Gasto borrado"});
            /*res.status(201).json({"Gasto eliminado":res.affectedRows});*/
        }else{
            console.log(err);
        }
    });
});


export default router;