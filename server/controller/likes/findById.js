const { user_place_likes } = require('../../models');

module.exports.findLikeById = async (userId, postId) => {
  return await user_place_likes.findOne({ where: { userId, postId } });
};
