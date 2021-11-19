'use strict';
const { Model } = require('sequelize');
const user_place_likes = require('./user_place_likes');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.comments, { foreignKey: 'userId' });
      user.hasMany(models.post, { foreignKey: 'userId' });
      user.hasMany(models.user_place_likes, { foreignKey: 'userId' });
    }
  }
  user.init(
    {
      nickname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.INTEGER,
      img: DataTypes.STRING,
      platform: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'user',
    },
  );
  return user;
};
