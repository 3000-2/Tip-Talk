'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      post.belongsTo(models.user, { foreignKey: 'id' });
      post.belongsTo(models.categories, { foreignKey: 'categoryId' });
      post.hasMany(models.comments, { foreignKey: 'postId' });
      post.hasMany(models.user_place_likes, { foreignKey: 'postId' });
    }
  }
  post.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      images: DataTypes.TEXT,
      views: DataTypes.INTEGER,
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      categoryId: DataTypes.INTEGER,
      lat: DataTypes.FLOAT,
      lng: DataTypes.FLOAT,
      region: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'post',
    },
  );
  return post;
};
