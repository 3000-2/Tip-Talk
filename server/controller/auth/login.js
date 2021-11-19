require('dotenv').config();
const { user } = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userInfo = await user.findOne({
      where: { email, platform: 0 }, // password: password },
    });
    if (!userInfo) {
      res.status(400).json({
        status: false,
        message: '이메일 혹은 비밀번호가 일치하지 않습니다.',
      });
    } else {
      bcrypt.compare(password, userInfo.password, function (err, result) {
        if (!result) {
          return res.status(400).json({
            status: false,
            message: '이메일 혹은 비밀번호가 일치하지 않습니다.',
          });
        } else {
          const accessToken = jwt.sign(
            {
              id: userInfo.id,
              role: userInfo.role,
            },
            process.env.ACCESS_SECRET,
          );
          res.cookie('accessToken', accessToken, {
            SameSite: 'none',
            Secure: true,
            HttpOnly: true,
          });
          res.status(200).json({
            status: true,
            data: {
              token: accessToken,
              user: {
                id: userInfo.id,
                email: userInfo.email,
                nickname: userInfo.nickname,
                role: userInfo.role,
              },
            },
          }); //userInfo
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: 'server error' });
  }
};

//compare
