const express = require('express');
const router = express.Router();
const ControleUsuarios = require('../controllers/ControleUsuarios');



router.post('/cadastro', ControleUsuarios.postusuarios);
router.post('/login', ControleUsuarios.postLogin);



module.exports = router;
