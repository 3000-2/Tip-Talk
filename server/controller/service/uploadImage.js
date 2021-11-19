require('dotenv').config();
const path = require('path');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');

AWS.config.update({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: 'ap-northeast-2',
  },
});

module.exports = {
  uploadImage: async (file, userId) => {
    const fileName = `${Date.now()}-${userId}`;
    const data = await file.buffer;

    const S3 = new AWS.S3();

    return await S3.upload({
      Body: data,
      Bucket: 'drawit',
      Key: fileName,
      ACL: 'public-read',
      ContentType: 'image/png',
    }).promise();
  },
};

module.exports.upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'drawit',
    key: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + Math.floor(Math.random() * 100) + ext);
    },
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
});
