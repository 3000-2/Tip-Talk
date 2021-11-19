const { categories } = require('../../models');

module.exports = async (req, res) => {
  try {
    const findAll = await categories.findAll();
    res.status(200).json({ status: true, data: findAll });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
