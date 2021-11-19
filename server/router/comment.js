const express = require('express');
const { commentController } = require('../controller/index');
const { isLoggedIn, isAuth } = require('../middleware');

const router = express.Router();

// * /comment
router.get('/:postId', isLoggedIn, commentController.getAll);

// ToDo 유저 미들웨어 추가
router.post('/:postId', isLoggedIn, isAuth, commentController.upload);

// ToDo 유저 미들웨어 추가
router.patch('/:commentId', isLoggedIn, isAuth, commentController.update);

// ToDo 유저 미들웨어 추가
router.delete('/:commentId', isLoggedIn, isAuth, commentController.deleteOne);

module.exports.commentRouter = router;
