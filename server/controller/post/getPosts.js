const { Op } = require('sequelize');
const { post, user, categories } = require('../../models');

module.exports = async (req, res) => {
  const { categoryId, page, search, order, offset } = req.query;
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
        offset: page ? +page * +offset : 0,
        limit: page ? +offset : 100,
      });
      res.status(200).json({ status: true, data: { post: found } });
    } else {
      let max;
      if (page !== undefined) {
        max = await post.count();
        max = Math.ceil(max / offset);
      }
      let filter = [['createdAt', 'DESC']];
      if (order == 1) {
        filter = [['views', 'DESC']];
      } else if (order == 2) {
        filter = [['likes', 'DESC']];
      }
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
        ],
        order: filter,
        offset: page ? Number(page) * Number(offset) : 0,
        limit: page ? +offset : 100,
      });
      res.status(200).json({ status: true, data: { post: found, max } });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: false, message: err.message });
  }
};
