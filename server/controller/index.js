module.exports = {
  commentController: {
    getAll: require('./comments/getAll'),
    upload: require('./comments/upload'),
    update: require('./comments/update'),
    deleteOne: require('./comments/deleteOne'),
  },
  categoryController: {
    getAll: require('./categories/getAll'),
  },
  oauthController: {
    googleLogin: require('./oauth/googleLogin'),
    kakaoLogin: require('./oauth/kakaoLogin'),
  },
  authController: {
    sendEmail: require('./auth/sendEmail'),
    deleteUser: require('./auth/deleteUser'),
    findId: require('./auth/findId'),
    login: require('./auth/login'),
    signout: require('./auth/signout'),
    signup: require('./auth/signup'),
    me: require('./auth/me'),
  },
  postController: {
    deletePost: require('./post/deletePost'),
    editPost: require('./post/editPost'),
    getPost: require('./post/getPost'),
    uploadPost: require('./post/uploadPost'),
    getPosts: require('./post/getPosts'),
    getAround: require('./post/around/getAround'),
    getMyPost: require('./post/mypost/getMyPost'),
    autoComplete: require('./post/autocomplete'),
    likePosts: require('./post/likePosts'),
  },
  userController: {
    editUserInfo: require('./user/editUserInfo'),
    getUserInfo: require('./user/getUserInfo'),
  },
  likeController: {
    likePost: require('./likes/likePost'),
  },
};
