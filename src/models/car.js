'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {

    static associate(models) {
      Car.belongsTo(models.Users, {foreignKey: 'userId'});
      Car.hasMany(models.productInCart, {foreignKey: 'carId'})
    }
  }
  Car.init({
    userId: DataTypes.INTEGER,
    totalPrice: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};