const { Op } = require('sequelize');
const { post } = require('../../models');

module.exports = async (req, res) => {
  const { search } = req.query;
  try {
    const found = await post.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
      attributes: ['title'],
      limit: 5,
    });
    res.status(200).json({ status: true, data: { post: found } });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: false, message: err.message });
  }
};
