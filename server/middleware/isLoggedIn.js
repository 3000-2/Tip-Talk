require('dotenv').config();
const jwt = require('jsonwebtoken');
const findId = require('../controller/auth/findId');

// * 로그인을 했을 경우에만 토큰을 확인
module.exports = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (token) {
    jwt.verify(token, process.env.ACCESS_SECRET, async (err, encoded) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: err,
        });
      }
      const user = await findId(encoded.id);

      if (!user) {
        return res.status(404).json({
          status: false,
          message: '로그인이 되어있지 않은 사용자입니다.',
        });
      }

      req.user = {
        id: user.id,
        role: user.role,
      };
      next();
    });
  } else {
    next();
  }
};
