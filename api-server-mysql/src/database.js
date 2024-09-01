/*const dotenv = require("dotenv");
dotenv.config();
import dotenv from 'dotenv';
dotenv.config();*/
import {DBHOST, DBUSER, DBPASS, DBNAME, DBPORT} from './config.js'

import mysql from 'mysql2';

const mysqlConnection = mysql.createPool({
    host: DBHOST,
    user: DBUSER,
    password: DBPASS,
    database: DBNAME,
    port: DBPORT
});

/*
mysqlConnection.connect(function (err){
    if (err){
        console.log(err);
        return;
    }else{
        console.log('DB is connected');
    }
});*/

export default mysqlConnection;