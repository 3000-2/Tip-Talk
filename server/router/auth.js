const express = require('express');

const { authController } = require('../controller/index');
const {
  isValidEmail,
  isValidNickname,
  lengthPassword,
  isLoggedIn,
  isAuth,
} = require('../middleware');

const router = express.Router();

router.post('/sendEmail', authController.sendEmail);
router.post('/login', lengthPassword, authController.login);
router.post(
  '/signup',
  isValidEmail,
  isValidNickname,
  lengthPassword,
  authController.signup,
);
router.post('/signout', authController.signout);
router.delete('/deleteUser', authController.deleteUser);
router.get('/me', isLoggedIn, authController.me);

module.exports.authRouter = router;
