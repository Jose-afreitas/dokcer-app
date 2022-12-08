const express = require('express');
const router = express.Router();
const ControllerUsers = require('../controllers/contollerUsers');



router.post('/cadastro', ControllerUsers.postUsers);
router.post('/login', ControllerUsers.postLogin);


module.exports = router;
