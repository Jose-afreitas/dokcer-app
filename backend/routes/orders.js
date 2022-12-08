const { request, respose } = require('express');
const express = require('express');
const router = express.Router();
const login = require('../middleware/login')
const ControlleOrders = require('../controllers/ControllerOrders')



router.post('/', login.mandatory, ControlleOrders.postOrders);
router.get('/', ControlleOrders.getOrders);
router.get('/:orderId', ControlleOrders.getOrderUnique)
router.patch('/', login.mandatory, ControlleOrders.patchOrder)
// router.delete('/', login.mandatory, ControlleOrders.deleteOrder)


module.exports = router;