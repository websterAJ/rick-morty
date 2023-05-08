'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favoritecharater extends Model {
    static associate(models) {
      this.belongsTo(models.users,{ foreignKey: 'id_user' });
      this.belongsTo(models.character,{ foreignKey: 'id_character' });
    }
  }
  favoritecharater.init({
    id: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    id_user:DataTypes.INTEGER,
    id_character:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'favoritecharater',
  });
  return favoritecharater;
};