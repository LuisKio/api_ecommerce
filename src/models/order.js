'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Users, {foreignKey: 'userId'});
      Order.hasMany(models.ProductInOrder, {foreignKey: 'orderId'})
    }
  }
  Order.init({
    totalPrice: DataTypes.FLOAT,
    userId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};