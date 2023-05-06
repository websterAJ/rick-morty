'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favoritecharater extends Model {
    static associate(models) {
      this.belongsToMany(models.users,{ 
        through: 'UserFavorite',
        foreignKey: "id_user",
        otherKey: "id"
       });
      this.belongsToMany(models.character,{ 
        through: 'CharacterFavorite',
        foreignKey: "id_character",
        otherKey: "id"
       });
    }
  }
  favoritecharater.init({
    id: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    id_user: DataTypes.INTEGER,
    id_character: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'favoritecharater',
  });
  return favoritecharater;
};