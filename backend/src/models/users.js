'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
    }
  }
  users.init({
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    email: DataTypes.STRING,
    pass: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};