const express = require('express');

const { oauthController } = require('../controller/index');

const router = express.Router();

router.post('/google', oauthController.googleLogin);
router.post('/kakao', oauthController.kakaoLogin)

module.exports.oauthRouter = router;
