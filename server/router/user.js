const express = require('express');
const multer = require('multer');

const { userController } = require('../controller/index');
const { isLoggedIn, isAuth } = require('../middleware');

const router = express.Router();
const upload = multer();

router.get('/:id', userController.getUserInfo);
router.patch(
  '/:id',
  isLoggedIn,
  isAuth,
  upload.single('img'),
  userController.editUserInfo,
);

module.exports.userRouter = router;
