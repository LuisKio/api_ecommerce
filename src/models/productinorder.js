'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductInOrder extends Model {

    static associate(models) {
      ProductInOrder.belongsTo(models.Order, {foreignKey: 'orderId'});
      ProductInOrder.belongsTo(models.Product, {foreignKey: 'productId'});
    }
  }
  ProductInOrder.init({
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ProductInOrder',
  });
  return ProductInOrder;
};