require('dotenv').config();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { user } = require('../../models');

module.exports = (req, res) => {
  const { authorizationCode } = req.body;

  axios
    .post('https://oauth2.googleapis.com/token', {
      code: authorizationCode,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: process.env.GRANT_TYPE,
    })
    .then(({ data }) => {
      const { access_token } = data;

      const infoUrl = `https://www.googleapis.com/oauth2/v1/userinfo`;

      axios
        .get(infoUrl, {
          headers: {
            authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        })
        .then(async ({ data }) => {
          // * 받아온 데이터로 이미 가입한 유저인지 확인
          const { email, name, picture } = data;

          try {
            const findUser = await user.findOne({
              where: { email, platform: 1 },
            });

            if (!findUser) {
              await user.create({
                email,
                role: 2,
                nickname: name,
                img: picture,
                password: null,
                platform: 1,
              });
            }
            const found = await user.findOne({ where: { email, platform: 1 } });

            const token = await jwt.sign(
              {
                id: found.id,
                role: found.role,
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
                token,
                user: {
                  id: found.id,
                  role: found.role,
                  email: found.email,
                  nickname: found.nickname,
                  img: found.img,
                  platform: found.platform,
                },
              },
            });
          } catch (err) {
            console.log(err.message);
            return res
              .status(500)
              .json({ status: false, message: 'Oauth google server error' });
          }
        })
        .catch((err) => {
          console.log(err);
          return res
            .status(500)
            .json({ status: false, message: 'Oauth google server error' });
        });
    })
    .catch(() => {});
};
