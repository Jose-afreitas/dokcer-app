const { request, response } = require('express');
const express = require('express');
const router = express.Router();
// require('dotenv').config();
const multer = require('multer');
const login = require('../middleware/login')
const ControllersProducts = require('../controllers/ControllerProducts')



//tratamento de upload de imagem
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
    // new Date().toISOString() +
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



router.post('/', login.mandatory, upload.single('productImage'), ControllersProducts.postProducts);
router.get('/', ControllersProducts.getProducts);
router.get('/:productId', ControllersProducts.getProductUnique)
router.patch('/', login.mandatory, upload.single('productImage'), ControllersProducts.patchProduct);
router.delete('/', login.mandatory, ControllersProducts.deleteProduct);



router.post('/:productId/imagem', login.mandatory, upload.single('productImage'), ControllersProducts.postImage);
router.get('/:productId/imagens', ControllersProducts.getImage)



module.exports = router;
