const { Op } = require('sequelize');
const {Product, Users} = require('../models');

class ProductServices {
    static async getProduct(id){
        try {
            const product = await Product.findOne({
                where: {
                    id
                }
            });

            return product;
        } catch (error) {
            throw(error);
        }
    }

    static async getProducts(){
        try {
            const products = await Product.findAll({
                include: [{
                    model: Users,
                    attributes: ['username']
                }],
                attributes: ['name', 'description', 'price', 'availableQty'],
                where: {
                    price: {
                        [Op.gt]: 0
                    }
                }
            })

            return products;
        } catch (error) {
            throw(error);
        }
    }

    static async createProduct(payload) {
        try {
            await Product.create(payload);
        } catch (error) {
            throw(error);
        }
    }


    static async updateProduct({productId}, payload) {
        try {
            await Product.update(payload, {
                where: {
                    id: productId
                }
            });
        } catch (error) {
            throw(error);
        }
    }
};


module.exports = ProductServices;