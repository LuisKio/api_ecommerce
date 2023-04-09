const OrderServices = require('../services/order.services');

const getOrders = async(req, res, next) => {
    try {
        const {id} = req.user;
        const orders = await OrderServices.getOrders(id);
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
}


const getProductsInOrders = async(req, res, next) => {
    try {
        const {id} = req.user;
        const orders = await OrderServices.getOrders(id);
        const idOrder = [];

        orders.forEach(order => {
            idOrder.push(order.id);
        });

        const productOrder = await OrderServices.getProductInOrder(idOrder);

        res.status(200).json(productOrder);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getOrders,
    getProductsInOrders
}