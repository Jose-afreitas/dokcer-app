const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        res: null
                    });
                }
                res.status(201).send({
                    message: 'Produto inserido com sucesso',
                    id_produto: result.insertId
                });
            }
        );

    });

});


module.exports = router;



