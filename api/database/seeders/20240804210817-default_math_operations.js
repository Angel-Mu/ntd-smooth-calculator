'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Operations', [
      {
        type: 'addition',
        cost_cents: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'subtraction',
        cost_cents: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'multiplication',
        cost_cents: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'division',
        cost_cents: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'square_root',
        cost_cents: 35,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'random_string',
        cost_cents: 35,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     *  await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Operations', { type: ['addition', 'subtraction', 'multiplication', 'division', 'square_root', 'random_string'] }, {});
  }
};
