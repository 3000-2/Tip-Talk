// * 로그인한 사용자만 사용할 수 있도록
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: false,
      message: '로그인이 되어있지 않은 사용자입니다.',
    });
  }

  next();
};
