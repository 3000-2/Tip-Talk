const { Op, fn, col } = require('sequelize');
const { post, user, categories, user_place_likes } = require('../../models');

module.exports = async (req, res) => {
  const { categoryId, page, search } = req.query;
  try {
    if (categoryId) {
      const found = await post.findAll({
        where: {
          categoryId,
          [Op.or]: [
            {
              title: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              region: {
                [Op.like]: `%${search}%`,
              },
            },
          ],
        },
        include: [
          { model: user, attributes: ['nickname', 'email', 'img'] },
          { model: categories, attributes: ['value'] },
        ],
        offset: page ? +page * 6 : 0,
        limit: page ? 6 : 100,
      });
      res.status(200).json({ status: true, data: { post: found } });
    } else {
      const found = await post.findAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              region: {
                [Op.like]: `%${search}%`,
              },
            },
          ],
        },
        include: [
          { model: user, attributes: ['nickname', 'email', 'img'] },
          { model: categories, attributes: ['value'] },
          {
            model: user_place_likes,
            attributes: [[fn('COUNT', 'id'), 'count']],
            separate: true,
            group: ['id'],
          },
        ],
        offset: page ? +page * 6 : 0,
        limit: page ? 6 : 100,
      });
      res.status(200).json({ status: true, data: { post: found } });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: false, message: err.message });
  }
};
