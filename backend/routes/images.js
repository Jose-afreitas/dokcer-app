const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const login = require('../middleware/login')
const ControllerImage = require('../controllers/ControllerImages')



router.delete('/:id_imagem', login.mandatory, ControllerImage.deleteImagem)

module.exports = router;
