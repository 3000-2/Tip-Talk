'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        email: 'test@test.com',
        nickname: '나그네',
        img: '',
        password:
          '$2b$10$SN5k7qgk/4kAm7ZodwUtEO6be2fZN1aEZy.IbkSdj47umCnD4ju5m',
        role: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'test2@test.com',
        nickname: '정지훈',
        img: '',
        password:
          '$2b$10$SN5k7qgk/4kAm7ZodwUtEO6be2fZN1aEZy.IbkSdj47umCnD4ju5m',
        role: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
