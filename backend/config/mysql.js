const mysql = require("mysql");
require('dotenv').config();

var pool = mysql.createPool({
  conectionLimit: 80,
  user: process.env.MYSQL_DBAPP_USER,
  password: process.env.MYSQL_DBAPP_PASSWORD,
  database: process.env.MYSQL_DBAPP_DATABASE,
  host: process.env.MYSQL_DBAPP_HOST,
  port: process.env.MYSQL_DBAPP_PORT
});




exports.execute = (query, params = []) => {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (error, result, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(result)
      }
    });
  }
  )
}


exports.pool = pool;



