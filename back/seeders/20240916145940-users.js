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
          name: 'Admin User',
          email: 'admin@randommail.com',
          role: 'admin',
          password: await encryptPassword('StrongPassw-123456'),
        },
        {
          id: 2,
          name: 'Editor User',
          email: 'editor@randommail.com',
          role: 'editor',
          password: await encryptPassword('StrongPassw-123456'),
        },
        {
          id: 3,
          name: 'User User',
          email: 'user@randommail.com',
          role: 'user',
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
