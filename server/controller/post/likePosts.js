const { post, user_place_likes } = require('../../models');

module.exports = async (req, res) => {
  const { userId } = req.params;
  const find = await user_place_likes.findAll({
    where: { userId: +userId },
    include: [
      {
        model: post,
        attributes: ['id', 'userId', 'title', 'images', 'views', 'likes'],
      },
    ],
  });
  res.status(200).json({ status: true, data: { find } });
};
