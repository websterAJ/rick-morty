'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    static associate(models) {
      
    }
  }
  Character.init({
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    species: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.STRING,
    org_name: DataTypes.STRING,
    org_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};