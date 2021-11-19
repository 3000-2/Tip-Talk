'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_place_likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_place_likes.belongsTo(models.user, { foreignKey: 'userId' });
      user_place_likes.belongsTo(models.post, { foreignKey: 'postId' });
    }
  }
  user_place_likes.init(
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'user_place_likes',
    },
  );
  return user_place_likes;
};
