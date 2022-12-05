const { request, response } = require('express');
const express = require('express');
const router = express.Router();
// const mysql = require('../config/mysql').pool;
require('dotenv').config();
const multer = require('multer');
const login = require('../middleware/login')
const ControleProduto = require('../controllers/ControleProdutos')



//tratamento de upload de imagem
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, new Date().toISOString() + file.originalname);
  }
})

const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(null, false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter

})






// router.post('/', login.obrigatorio, upload.single('imagem_produto'), ControleProduto.postProdutos);

router.get('/', ControleProduto.getProdutos);
// router.get('/:id_produto', ControleProduto.getProdutoUnico)
// router.patch('/', login.obrigatorio, upload.single('imagem_produto'), ControleProduto.patchProdutos);
// router.delete('/', login.obrigatorio, ControleProduto.deleteProduto);


module.exports = router;
