const { Op } = require('sequelize');
const { post } = require('../../../models');

module.exports = async (req, res) => {
  const { lat, lng } = req.query;
  const { id } = req.params;
  const postInfo = await post.findOne({
    where: { id },
  });
  try {
    if (postInfo) {
      const around = await post.findAll({
        where: {
          id: {
            [Op.not]: id,
          },
          [Op.and]: [
            {
              lat: {
                [Op.between]: [+lat - 0.1, +lat + 0.1],
              },
            },
            {
              lng: {
                [Op.between]: [+lng - 0.1, +lng + 0.1],
              },
            },
          ],
        },
      });
      return res.status(200).json({ status: true, data: { posts: around } });
    }
  } catch (err) {
    res.status(500).json({ status: false, message: 'errrrr' });
  }
};
