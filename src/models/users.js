'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
 
    static associate(models) {
      Users.hasMany(models.Product, {foreignKey: "userId"});
      Users.hasOne(models.Car, {foreignKey: 'userId'});
      Users.hasMany(models.Order, {foreignKey: 'userId'})
    }
  }
  Users.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};