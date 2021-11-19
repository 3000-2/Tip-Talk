const { comments, post, user } = require('../../models');

module.exports = async (req, res) => {
  const { page } = req.query;
  const { postId } = req.params;

  try {
    const foundPost = await post.findOne({
      where: { id: postId },
    });

    if (!foundPost) {
      return res
        .status(404)
        .json({ status: false, message: '존재하지 않는 게시글입니다.' });
    }

    let max = await comments.count({ where: { postId } });
    max = Math.ceil(max / 10) - 1;

    const data = await comments.findAll({
      where: { postId },
      include: [{ model: user, attributes: ['nickname', 'img'] }],
      offset: page ? +page * 10 : 0,
      limit: 10,
    });

    if (req.user) {
      data.forEach((d) => {
        if (d.dataValues.userId === req.user.id) {
          d.dataValues['isMine'] = true;
        }
      });
    }

    res.status(200).json({ status: true, data, max });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
