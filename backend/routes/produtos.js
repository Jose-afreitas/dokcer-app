const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            ' INSERT IGNORE INTO produtos (nome, preco) VALUES (?,?)',
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


router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query
            ('SELECT * FROM ecommerce.produtos;',
                (error, result, fields) => {

                    if (error) { return res.status(500).send({ error: error }) }
                    return res.status(200).send({ response: result })


                });
    });
});



router.patch


module.exports = router;
