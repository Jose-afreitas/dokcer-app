const express = require('express');

const router = express.Router();


router.get('/', (req, res, next) => {
    res.status(200).send({
        message: 'Retorna os Pedidos'
    });
});

router.post('/', (req, res, next) => {

    const pedido = {
        id_produto: req.body.id_produto,
        quandtidade: req.body.quantidade
    }
    res.status(201).send({
        message: 'Inserindo um Pedidos',
        pedidoCriado: pedido
    });
});

router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido
    if (id === 'especial') {
        res.status(200).send({
            message: 'Você descobriu o ID especial',
            id: id
        })
    } else {
        res.status(200).send({
            message: "Você passou um ID"
        });
    }
});

module.exports = router;