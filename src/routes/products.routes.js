const {Router} = require('express');
const authentication = require('../middlewares/auth.middleware');
const {createProduct, updateProduct, getProducts} = require('../controllers/product.controllers');
const {createValidator, updateValidator} = require('../validators/products.validator');

const router = Router();

router.post('/product', createValidator, authentication, createProduct);
router.put('/product/update', updateValidator, authentication, updateProduct);
router.get('/products', authentication, getProducts);


module.exports = router;