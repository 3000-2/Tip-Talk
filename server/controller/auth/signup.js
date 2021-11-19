const { user } = require('../../models');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  try {
    const { email, nickname, password, role } = req.body;

    if (!email || !nickname || !password || !role) {
      return res
        .status(400)
        .json({ status: false, message: '모든 항목을 입력해야 합니다.' });
    }
    const userInfo = await user.findOne({
      where: {
        email: email,
        nickname: nickname,
        platform: 0,
      },
    });
    if (userInfo) {
      res.status(409).json({ status: false, message: '중복된 이메일입니다.' });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) {
            throw err;
          } else {
            await user.create({
              email: email,
              nickname: nickname,
              password: hash,
              role,
            });
            await user.findOne({
              where: {
                email: email,
                nickname: nickname,
              },
            });
            res.status(201).json({
              status: true,
              data: { email, nickname },
            });
          }
        });
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: 'server error' });
  }
};
