
const mysql = require('../config/mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


exports.postUsers = (req, res, next) => {
  mysql.getConnection((err, conn) => {
    if (err) { return res.status(500).send({ error: error }) }
    //conferindo se já possui o registro no banco
    conn.query(
      'SELECT * FROM ecommerce.users WHERE email = ?',
      [req.body.email],
      (error, results) => {
        if (error) { return res.status(500).send({ error: error }) }
        if (results.length > 0) {
          res.status(409).send({ message: 'Usuário já cadastrado' })
        }
        //Se não possuir registro então cadastre
        else {
          bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
            if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }
            conn.query(
              `INSERT INTO users (email, password) VALUES (?,?);`,
              [req.body.email, hash],
              (error, results) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                response = {
                  message: "Usuário cadastrado com sucesso!",
                  usuarioCriado: {
                    userId: results.insertId,
                    email: req.body.email
                  }
                }
                return res.status(201).send(response);
              });
          });
        }
      });
  });
}




exports.postLogin = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    const query =
      `SELECT * FROM ecommerce.users WHERE email =? `;
    conn.query(query, [req.body.email], (error, results, fields) => {
      conn.release();
      if (error) { return res.status(500).send({ error: error }) }
      if (results.length < 1) {
        return res.status(401).send({ message: 'authentication failed' })
      }
      bcrypt.compare(req.body.password, results[0].password, (err, result) => {
        if (err) {
          return res.status(401).send({ message: 'authentication failed' })
        }
        if (result) {
          const token = jwt.sign({
            usersId: results[0].usersId,
            email: results[0].email,
          },
            process.env.JWT_KEY,
            {
              expiresIn: "6h"
            });
          console.log("token: ", token);
          return res.status(200).send({
            message: 'successfully authenticated!',
            token: token
          });
        }
        return res.status(401).send({ message: 'authentication failed' })
      });
    });
  });
}
