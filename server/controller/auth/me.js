const { user } = require('../../models');

module.exports = async (req, res) => {
  if (!req.user) {
    return res.status(200).json({ status: true, data: null });
  }
  try {
    const found = await user.findOne({
      where: { id: req.user.id },
      attributes: ['id', 'email', 'nickname', 'img', 'role', 'platform'],
    });

    res.status(200).json({ status: true, data: { user: found } });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: false, message: err.message });
  }
};
