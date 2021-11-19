const { user_place_likes, post } = require('../../models');
const { findPostById } = require('../post/findById');
const { findLikeById } = require('./findById');

module.exports = async (req, res) => {
  const { postId } = req.params;

  try {
    const findPost = await findPostById(postId);

    if (!findPost) {
      return res
        .status(404)
        .json({ status: false, message: '존재하지 않는 게시글입니다.' });
    }

    const isLike = await findLikeById(req.user.id, postId);

    if (isLike) {
      await user_place_likes.destroy({ where: { id: isLike.id } });
      await post.update(
        { likes: findPost.likes - 1 },
        { where: { id: postId } },
      );
      return res.status(200).json({ status: true, data: null });
    } else {
      const created = await user_place_likes.create({
        userId: req.user.id,
        postId,
      });
      await post.update(
        { likes: findPost.likes + 1 },
        { where: { id: postId } },
      );
      res.status(201).json({ status: true, data: created });
    }
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
