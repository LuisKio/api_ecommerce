'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productInCart extends Model {

    static associate(models) {
      productInCart.belongsTo(models.Product, {foreignKey: 'productId'});
      productInCart.belongsTo(models.Car, {foreignKey: 'carId'});
    }
  }
  productInCart.init({
    carId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'productInCart',
  });
  return productInCart;
};