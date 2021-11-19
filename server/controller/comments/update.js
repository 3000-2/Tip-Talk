const { comments } = require('../../models');

module.exports = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;

  // * 텍스트 입력했는지 확인
  if (!text) {
    return res
      .status(400)
      .json({ status: false, message: '댓글을 입력해주세요' });
  }

  try {
    // * commentid를 이용 comment 찾기
    const comment = await comments.findOne({ where: { id: commentId } });

    if (!comment) {
      return res
        .status(404)
        .json({ status: false, message: '존재하지 않는 댓글입니다.' });
    }

    if (comment.userId !== req.user.id) {
      return res
        .status(403)
        .json({ status: false, message: '권한이 없는 요청입니다.' });
    }

    await comments.update({ text }, { where: { id: commentId } });

    res
      .status(200)
      .json({ status: true, data: { ...comment.dataValues, text } });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
