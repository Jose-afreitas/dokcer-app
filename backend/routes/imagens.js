const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const login = require('../middleware/login')
const ControleImagens = require('../controllers/ControleImagens')




router.delete('/:id_imagem', login.mandatory, ControleImagens.deleteImagem)

module.exports = router;
