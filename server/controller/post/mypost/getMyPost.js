const { post, user } = require('../../../models');

module.exports = async (req, res) => {
  try {
    const myPost = await post.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: user,
          attributes: ['id', 'nickname'],
        },
      ],
    });
    res.status(200).json({ status: true, data: { myPost } });
  } catch (err) {
    res.status(500).json({ status: false, message: err });
  }
};
