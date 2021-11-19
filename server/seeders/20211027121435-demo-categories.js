'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          value: '문화시설',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          value: '관광지',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          value: '음식점',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          value: '카페',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          value: '숙박',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
