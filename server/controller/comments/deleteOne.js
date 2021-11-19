const { comments } = require('../../models');

module.exports = async (req, res) => {
  const { commentId } = req.params;

  try {
    const found = await comments.findOne({ where: { id: commentId } });

    if (found.userId !== req.user.id) {
      return res
        .status(403)
        .json({ status: false, message: '권한이 없는 요청입니다.' });
    }

    await comments.destroy({ where: { id: commentId } });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
