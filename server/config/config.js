require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'tip_talk',
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: 'mysql',
  },
};
