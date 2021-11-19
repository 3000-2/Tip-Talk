module.exports = async (req, res, next) => {
  const { password } = req.body;
  if (password.length < 8) {
    return res
      .status(400)
      .json({ status: false, message: '비밀번호는 8자리 이상이여야합니다.' });
  }
  next();
};
