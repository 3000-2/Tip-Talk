const { post } = require('../../models');
const { findPostById } = require('./findById');

module.exports = async (req, res) => {
  const { title, content, images, categoryId } = req.body;
  const { id } = req.params;

  if (!title || !content || !categoryId || (!images && !req.files.length)) {
    return res
      .status(400)
      .json({ status: false, message: '모든 항목을 입력해야 합니다.' });
  }

  try {
    const findPost = await findPostById(id);

    if (!findPost) {
      return res
        .status(404)
        .json({ status: false, message: '존재하지 않는 게시글입니다.' });
    }
    if (findPost.userId !== req.user.id) {
      return res
        .status(403)
        .json({ status: false, message: '권한이 없는 요청입니다.' });
    }

    let newImages = [];

    if (req.files.length) {
      newImages = req.files.map((file) => file.location);
    }

    if (typeof images === 'object') {
      newImages = images.concat([...newImages]).join(' ');
    } else {
      newImages = [images].concat([...newImages]).join(' ');
    }

    newImages = newImages[0] === ' ' ? newImages.slice(1) : newImages;

    await post.update(
      { title, content, categoryId, images: newImages },
      { where: { id } },
    );

    const updated = await findPostById(id);

    res.status(200).json({ status: true, data: updated });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: false, message: err.message });
  }
};
