module.exports = async (req, res) => {
  await res
    .clearCookie('accessToken')
    .status(200)
    .json({ status: true, message: '로그아웃 하였습니다.' });
};
