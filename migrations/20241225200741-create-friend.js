'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Friends', {
      userAId: {
        type: Sequelize.UUID,
		allowNull: false,
        primaryKey: true,
		defaultValue: Sequelize.UUIDV4
      },
      userBId: {
        type: Sequelize.UUID,
		allowNull: false,
        primaryKey: true,
		defaultValue: Sequelize.UUIDV4
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Friends');
  }
};
