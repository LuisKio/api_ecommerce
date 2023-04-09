const { Op } = require('sequelize');
const { Order, ProductInOrder, Product } = require('../models');

class OrderServices {
    static async createOrder(payload) {
        try {
            const order = await Order.create(payload);
            return order;
        } catch (error) {
            throw (error);
        }
    }

    static async insertOrder(payload) {
        try {
            await ProductInOrder.bulkCreate(payload);
        } catch (error) {
            throw (error);
        }
    }

    static async getOrders(userId) {
        try {
            const orders = await Order.findAll({
                where: {
                    userId
                },
                attributes: ['id', 'totalPrice', 'status', 'createdAt', 'updatedAt']
            });

            return orders;
        } catch (error) {
            throw (error);
        }
    }

    static async getProductInOrder(idOrder) {
        try {
            const order = await ProductInOrder.findAll({
                include: [{
                    model: Product,
                    attributes: ['name']
                }],
                where: {
                    orderId: {
                        [Op.in]: idOrder
                    }
                },
                attributes: ['orderId', 'quantity', 'price', 'createdAt']
            });

            return order;
        } catch (error) {
            throw (error);
        }
    }
}


module.exports = OrderServices;