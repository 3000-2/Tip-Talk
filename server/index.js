const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { authRouter } = require('./router/auth');
const { oauthRouter } = require('./router/oauth');
const { postRouter } = require('./router/post');
const { userRouter } = require('./router/user');
const { commentRouter } = require('./router/comment');
const { categoryRouter } = require('./router/category');
const { likeRouter } = require('./router/like');
const { logger } = require('./middleware');

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger);

app.get('/', (req, res) => {
  res.status(200).send('hello');
});

app.use('/auth', authRouter);
app.use('/oauth', oauthRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/comment', commentRouter);
app.use('/category', categoryRouter);
app.use('/like', likeRouter);

app.listen(port, () => {
  console.log(`the server is running http://localhost:${port}`);
});
