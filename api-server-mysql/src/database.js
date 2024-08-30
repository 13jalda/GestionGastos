const dotenv = require("dotenv");
dotenv.config();

const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host:process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME
    //multipleStatements: true
});


mysqlConnection.connect(function (err){
    if (err){
        console.log(err);
        return;
    }else{
        console.log('DB is connected');
    }
});

module.exports = mysqlConnection;