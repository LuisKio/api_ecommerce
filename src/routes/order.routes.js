const {Router} = require('express');
const authentication = require('../middlewares/auth.middleware');
const {getOrders, getProductsInOrders} = require('../controllers/order.controllers');

const router = Router();

router.get('/order', authentication, getOrders);
router.get('/order/products', authentication, getProductsInOrders);

module.exports = router;