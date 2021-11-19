require('dotenv').config();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { user } = require('../../models');

module.exports = async (req, res) => {
  try {
    const { authorizationCode } = req.body;
    const kakaoToken = await axios.post(
      `https://kauth.kakao.com/oauth/token?code=${authorizationCode}&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&grant_type=${process.env.GRANT_TYPE}`,
    );
    const { access_token } = kakaoToken.data;
    const kakaoUser = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    const kakao = kakaoUser.data;
    const [userInfo, created] = await user.findOrCreate({
      where: { email: kakao.kakao_account.email, platform: 2 },
      defaults: {
        nickname: kakao.properties.nickname,
        img: kakao.properties.profile_image,
        email: kakao.kakao_account.email,
        password: null,
        platform: 2,
      },
    });
    const token = await jwt.sign(
      {
        id: userInfo.id,
        role: userInfo.role,
      },
      process.env.ACCESS_SECRET,
    );
    res.cookie('accessToken', token, {
      SameSite: 'none',
      Secure: true,
      HttpOnly: true,
      expires: new Date(Date.now() + 1 * 3600000),
    });
    res.status(200).json({
      status: true,
      data: {
        user: {
          id: userInfo.id,
          email: userInfo.email,
          nickname: userInfo.nickname,
          img: userInfo.img,
          role: userInfo.role,
          platform: userInfo.platform,
        },
      },
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, message: 'kakao server error' });
  }
};
