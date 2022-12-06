const { request, respose } = require('express');
const express = require('express');
const router = express.Router();
const mysql = require('../config/mysql');
const ControlePedido = require('../controllers/ControlePedidos')



router.post('/', ControlePedido.postPedidos);
router.get('/', ControlePedido.getPedidos);
router.get('/:id_pedido', ControlePedido.getPedidoUnico)
router.patch('/', ControlePedido.patchPedidos)
router.delete('/', ControlePedido.deletePedido)


module.exports = router;