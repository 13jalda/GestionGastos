const express = require('express');
const router = express.Router();

const mysqlConnection = require("../database");

router.get('/ingresos/:id', (req, res) =>{
    const { id } = req.params;
    const id_user = req.body.id_user;
    console.log (req.body);
    const query = `SELECT * FROM ingresos WHERE id_ingreso = ? AND id_usuario_ingreso = ?`

    mysqlConnection.query (query, [id,id_user], (err, rows, fields) =>{
        if(!err){
           /* res.json(rows[0]);*/
            res.status(200).json(rows[0]);
        }else{
            console.log(err);
        }
    });
});


router.get('/ingresos/', (req, res) =>{
    const id_user = req.body.id_user;
    console.log (req.body);
    const query =`SELECT i.id_ingreso, i.fecha_ingreso, i.importe_ingreso, sc.nombre_subcategoria, c.nombre_categoria
                    FROM ingresos i
                    JOIN subcategorias sc
                    ON i.id_subcat_ingreso = sc.id_subcategoria
                    JOIN categorias c
                    ON c.id_categoria = sc.id_categoria_subcat
                    WHERE i.id_usuario_ingreso = ?`;

    mysqlConnection.query (query, [id_user], (err, rows, fields) =>{
        if(!err){
            res.json(rows);
            /*res.status(200).json(res);*/
        }else{
            console.log(err);
        }
    });
});

router.post('/ingresos/', (req, res) =>{
    let fecha = req.body.fecha;
    const importe = req.body.importe_ingreso;
    const id_subcat = req.body.id_subcategoria;
    const id_user = req.body.id_user;

    if (fecha === ""){
        fecha = new Date();
        /*fecha = "CURDATE()";*/
    }

    const query =`INSERT INTO ingresos (fecha_ingreso, importe_ingreso, id_subcat_ingreso, id_usuario_ingreso) 
                    VALUES (?,?,?,?)`;
    mysqlConnection.query (query,[fecha,importe,id_subcat,id_user],(err, rows, fields) =>{        
        if(!err){
            res.json({Status: "Ingreso añadido"});
            /*res.status(201).json({"Gasto Creado":res.affectedRows});*/
        }else{
            console.log(err);
        }
    });
});

router.delete('/ingresos/:id', (req, res) =>{
    const { id }= req.params;
    const query =`DELETE FROM ingresos WHERE id_ingreso = ?`;
    mysqlConnection.query (query,[id],(err, rows, fields) =>{        
        if(!err){
            res.json({Status: "Ingreso borrado"});
            /*res.status(201).json({"Gasto eliminado":res.affectedRows});*/
        }else{
            console.log(err);
        }
    });
});


module.exports = router;