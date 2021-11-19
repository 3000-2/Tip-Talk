const { user } = require('../../models');

module.exports = async (id) => {
  const found = await user.findOne({ where: id });
  return found;
};
