'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Like_dislikes', {
      userId: {
        type: Sequelize.UUID,
		allowNull: false,
        primaryKey: true,
		defaultValue: Sequelize.UUIDV4
      },
      postId: {
        type: Sequelize.UUID,
		allowNull: false,
        primaryKey: true,
		defaultValue: Sequelize.UUIDV4

      },
      like_dislike: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Like_dislikes');
  }
};
