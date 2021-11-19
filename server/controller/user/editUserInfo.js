const bcrypt = require('bcrypt');
const { user } = require('../../models');
const { uploadImage } = require('../service/uploadImage');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { nickname, oldpassword, password, role } = req.body;
  // bcrypt 사용, role 추가

  const findUser = await user.findOne({ where: { id: req.user.id } });

  if (req.file) {
    let imageUrl;
    imageUrl = await uploadImage(req.file, req.user.id);
    await user.update(
      {
        img: imageUrl ? imageUrl.Location : findUser.img,
      },
      {
        where: { id },
      },
    );
    return res
      .status(200)
      .json({ status: true, data: { img: imageUrl.Location } });
  }

  try {
    if (oldpassword === '') {
      await user.update(
        {
          nickname: nickname ? nickname : findUser.nickname,
          role: role ? role : findUser.role,
        },
        {
          where: { id: req.user.id },
        },
      );

      const updated = await user.findOne({
        where: { id: req.user.id },
        attributes: ['id', 'nickname', 'email', 'img', 'role'],
      });

      res.status(200).json({ status: true, data: { updated } });
    } else {
      bcrypt.compare(oldpassword, findUser.password, async (err, result) => {
        if (!result) {
          return res
            .status(400)
            .json({ status: false, message: '비밀번호를 확인해주세요' });
        } else {
          let hashed;
          if (password) {
            if (password.length < 8) {
              return res.status(400).json({
                status: false,
                message: '비밀번호는 8자리 이상이어야 합니다',
              });
            }
            hashed = await bcrypt.hash(password, 10);
          }

          await user.update(
            {
              nickname: nickname ? nickname : findUser.nickname,
              password: hashed ? hashed : findUser.password,
              role: role ? role : findUser.role,
            },
            {
              where: { id: req.user.id },
            },
          );

          const updated = await user.findOne({
            where: { id: req.user.id },
            attributes: ['id', 'nickname', 'email', 'img', 'role'],
          });

          res.status(200).json({ status: true, data: { updated } });
        }
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: true, message: err.message });
  }
};
