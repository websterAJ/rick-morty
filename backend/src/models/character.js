'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class character extends Model {
    static associate(models) {
      this.belongsToMany(models.favoritecharater,{ through: 'favoritecharater' })
    }
  }
  character.init({
    id: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    status: DataTypes.STRING,
    origin: DataTypes.STRING,
    species: DataTypes.STRING,
    gender: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'character',
  });
  return character;
};