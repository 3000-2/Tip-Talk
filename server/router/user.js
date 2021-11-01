const express = require('express');

const { userController } = require('../controller/index');

const router = express.Router();

router.get('/:id', userController.getUserInfo);
router.patch('/:id', userController.editUserInfo);

module.exports.userRouter = router;
