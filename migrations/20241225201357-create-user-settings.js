'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_settings', {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4
      },
      profileImage: {
        type: Sequelize.STRING
      },
      bannerImage: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.STRING
      },
      theme: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('User_settings');
  }
};
