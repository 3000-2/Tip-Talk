const { comments, post } = require('../../models');

module.exports = async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;

  if (!text) {
    return res
      .status(400)
      .json({ status: false, message: '댓글을 입력해주세요' });
  }

  // ToDo postid로 post를 찾고 없을때 처리

  try {
    const found = await post.findOne({ where: { id: postId } });

    if (!found) {
      return res
        .status(404)
        .json({ status: false, message: '존재하지 않는 게시글입니다.' });
    }

    const data = {
      text,
      userId: 1, // ToDo 유저 아이디로 변경
      postId,
    };

    const created = await comments.create({ ...data });

    res.status(200).json({ status: true, data: created });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};