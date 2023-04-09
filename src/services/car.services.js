const {Car, productInCart, Product} = require('../models');

class CarServices {
    static async createCar(payload){
        try {
            await Car.create(payload)
        } catch (error) {
            throw(error);
        }
    }

    static async getCarUser({id}){
        try {
            const {dataValues} = await Car.findOne({
                where: {
                    id
                }
            });

            return dataValues;
        } catch (error) {
            throw(error);
        }
    }

    static async updatePrice({id}, payload){
        try {
            await Car.update(payload, {
                where: {
                    id
                }
            });
        } catch (error) {
            throw(error);
        }
    }

    static async addProduct(payload){
        try {
            await productInCart.create(payload);
        } catch (error) {
            throw(error);
        }
    }

    static async getProducts(carId){
        try {
            const products = await productInCart.findAll({
                include: [{
                    model: Product,
                    attributes: ['name', 'price']
                }],
                where: {
                    carId,
                    status: false
                },
                attributes: ['productId', 'quantity']
            });
            
            return products;
        } catch (error) {
            throw(error);
        }
    }

    static async updateStatusProduct(carId){
        try {
            await productInCart.update({status: true},{
                where: {
                    carId,
                    status: false
                }
            })
        } catch (error) {
            throw(error);
        }
    }

    static async updateQuantity({carId, productId}, payload){
        try {
            await productInCart.update(payload, {
                where: {
                    carId,
                    productId,
                    status: false
                }
            })
        } catch (error) {
            throw(error);
        }
    }
}

module.exports = CarServices;