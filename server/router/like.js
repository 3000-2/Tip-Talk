const express = require('express');
const { isLoggedIn, isAuth } = require('../middleware');
const { likeController } = require('../controller/index');

const router = express.Router();

router.post('/:postId', isLoggedIn, isAuth, likeController.likePost);

module.exports.likeRouter = router;
