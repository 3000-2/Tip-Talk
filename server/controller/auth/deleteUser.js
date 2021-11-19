const { user } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
    if (userInfo) {
      await user
        .destroy({ where: { id: userInfo.id } })
        .then(
          res
            .clearCookie('accessToken')
            .status(200)
            .json({ status: true, message: '회원 탈퇴 성공하였습니다.' }),
        );
    } else if (!userInfo) {
      res
        .status(403)
        .json({ status: false, message: '권한이 없는 요청입니다.' });
    } else {
      res
        .status(401)
        .json({ status: false, message: '유효하지 않은 접근입니다.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: 'server error' });
  }
};
