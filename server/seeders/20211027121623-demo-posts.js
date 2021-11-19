'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('posts', [
      {
        title: '낙랑파라',
        content:
          '[{"type":"paragraph","children":[{"text":"아기자기한 소품들과 조용한 카페분위기에요~"}]}]',
        images: [
          'https://tip-talk.s3.ap-northeast-2.amazonaws.com/%E1%84%82%E1%85%A1%E1%86%A8%E1%84%85%E1%85%A1%E1%86%BC%E1%84%91%E1%85%A1%E1%84%85%E1%85%A1.jpeg',
        ],
        views: 24,
        lat: 37.55957245461398,
        lng: 126.95690573733543,
        region: '서울특별시 서대문구 북아현동',
        categoryId: 4,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '뜨랑블랑',
        content:
          '[{"type":"paragraph","children":[{"text":"카페 외관이 너무 이쁘고 내부도 디자인이 너무 이뻐요"}]}]',
        images: [
          'https://tip-talk.s3.ap-northeast-2.amazonaws.com/%E1%84%84%E1%85%B3%E1%84%85%E1%85%A1%E1%86%BC%E1%84%87%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A1%E1%86%BC.jpeg',
        ],
        views: 32,
        lat: 37.537114070206634,
        lng: 126.94382545190385,
        region: '서울특별시 마포구 마포동',
        categoryId: 4,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '비파티세리&쿠도스',
        content:
          '[{"type":"paragraph","children":[{"text":"가게에서 파는 빵이 너무 맛있고 공부하기도 좋아요"}]}]',
        images: [
          'https://tip-talk.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%B5%E1%84%91%E1%85%A1%E1%84%90%E1%85%B5%E1%84%89%E1%85%A6%E1%84%85%E1%85%B5.jpeg',
        ],
        views: 12,
        lat: 37.55017434738842,
        lng: 126.96003451324378,
        region: '서울특별시 마포구 공덕동',
        categoryId: 4,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '꼬꼬아찌 신촌점',
        content:
          '[{"type":"paragraph","children":[{"text":"치킨 양념이 아주 일품이에요~!"}]}]',
        images: [
          'https://tip-talk.s3.ap-northeast-2.amazonaws.com/%E1%84%81%E1%85%A9%E1%84%81%E1%85%A9%E1%84%8B%E1%85%A1%E1%84%8D%E1%85%B5.jpeg',
        ],
        views: 124,
        lat: 37.55862316623862,
        lng: 126.93587608628472,
        region: '서울특별시 서대문구 창천동',
        categoryId: 3,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '경복궁',
        content:
          '[{"type":"paragraph","children":[{"text":"밤에 가면 더 이뻐요"}]}]',
        images: [
          'https://tip-talk.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%A7%E1%86%BC%E1%84%87%E1%85%A9%E1%86%A8%E1%84%80%E1%85%AE%E1%86%BC.jpeg',
        ],
        views: 1004,
        lat: 37.57739253292275,
        lng: 126.97683793704662,
        region: '서울특별시 종로구 세종로',
        categoryId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '상암 월드컵공원',
        content:
          '[{"type":"paragraph","children":[{"text":"평화롭게 강아지랑 산책하기 너무 좋아요!"}]}]',
        images: [
          'https://tip-talk.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%AF%E1%86%AF%E1%84%80%E1%85%A9%E1%86%BC.jpeg',
        ],
        views: 143,
        lat: 37.565185705234086,
        lng: 126.89616126118634,
        region: '서울특별시 마포구 성산동',
        categoryId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '꾸까 광화문점',
        content:
          '[{"type":"paragraph","children":[{"text":"꽃들과함께하는 커피한잔! 이 조합은 실패 할 수가 없죠"}]}]',
        images: [
          'https://tip-talk.s3.ap-northeast-2.amazonaws.com/%E1%84%81%E1%85%AE%E1%84%81%E1%85%A1.jpeg',
        ],
        views: 23,
        lat: 37.57616547090997,
        lng: 126.97979295991718,
        region: '서울특별시 종로구 사간동',
        categoryId: 4,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '무라텐',
        content:
          '[{"type":"paragraph","children":[{"text":"일본에서 먹는 텐동보다 더 맛있어요"}]}]',
        images: [
          'https://tip-talk.s3.ap-northeast-2.amazonaws.com/%E1%84%90%E1%85%A6%E1%86%AB%E1%84%83%E1%85%A9%E1%86%BC.jpeg',
        ],
        views: 175,
        lat: 36.389767159020806,
        lng: 127.31559420227839,
        region: '대전광역시 유성구 반석동',
        categoryId: 3,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('posts', null, {});
  },
};
