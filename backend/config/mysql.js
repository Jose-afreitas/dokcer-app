const mysql = require("mysql");
require('dotenv').config();

var pool = mysql.createPool({
    user: process.env.MYSQL_DBAPP_USER,
    password: process.env.MYSQL_DBAPP_PASSWORD,
    database: process.env.MYSQL_DBAPP_DATABASE,
    host: process.env.MYSQL_DBAPP_HOST,
    port: process.env.MYSQL_DBAPP_PORT
});

exports.pool = pool;