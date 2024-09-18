'use strict';

const { encryptPassword } = require('../auth/encryption');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          email: 'user1@randommail.com',
          password: await encryptPassword('StrongPassw-123456'),
        },
        {
          id: 2,
          email: 'user2@randommail.com',
          password: await encryptPassword('StrongPassw-123456'),
        },
        {
          id: 3,
          email: 'user3@randommail.com',
          password: await encryptPassword('StrongPassw-123456'),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
