'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoriteCharacter extends Model {
    static associate(models) {
      this.belongsToMany(models.Character,{ 
        through: "favorite_character",
        foreignKey: "id_character",
        otherKey: "characterId"
      })
      this.belongsToMany(models.User,{ 
        through: "UserFavorite",
        foreignKey: "id_user",
        otherKey: "userId"
      })
    }
  }
  FavoriteCharacter.init({
    id: DataTypes.INTEGER,
    id_user: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    id_character: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Character',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'FavoriteCharacter',
  });
  return FavoriteCharacter;
};