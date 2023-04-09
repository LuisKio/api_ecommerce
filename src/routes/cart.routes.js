const {Router} = require('express');
const authentication = require('../middlewares/auth.middleware');
const {addProduct, getProducts, purchaseProducts} = require('../controllers/car.controllers');

const router = Router();

router.post('/car/addProduct', authentication, addProduct);
router.get('/car/products', authentication, getProducts);
router.get('/car/purchase', authentication, purchaseProducts);

module.exports = router;