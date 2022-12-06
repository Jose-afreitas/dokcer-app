const { request, respose } = require('express');
const express = require('express');
const router = express.Router();
const mysql = require('../config/mysql');
const login = require('../middleware/login')
const ControlePedido = require('../controllers/ControlePedidos')



router.post('/', login.obrigatorio, ControlePedido.postPedidos);
router.get('/', ControlePedido.getPedidos);
router.get('/:id_pedido', ControlePedido.getPedidoUnico)
router.patch('/', login.obrigatorio, ControlePedido.patchPedidos)
router.delete('/', login.obrigatorio, ControlePedido.deletePedido)


module.exports = router;