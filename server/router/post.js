const express = require('express');
const { isLoggedIn, isAuth } = require('../middleware');
const { postController } = require('../controller/index');
const { upload } = require('../controller/service/uploadImage');

const router = express.Router();

router.get('/', postController.getPosts);
router.get('/mypost', isLoggedIn, postController.getMyPost);
router.get('/like/:userId', postController.likePosts);
router.get('/search', postController.autoComplete);
router.get('/:id', isLoggedIn, postController.getPost);
router.get('/around/:id', postController.getAround);
router.post(
  '/',
  isLoggedIn,
  isAuth,
  upload.array('images'),
  postController.uploadPost,
);
router.patch(
  '/:id',
  isLoggedIn,
  isAuth,
  upload.array('images'),
  postController.editPost,
);
router.delete('/:id', isLoggedIn, isAuth, postController.deletePost);

module.exports.postRouter = router;
