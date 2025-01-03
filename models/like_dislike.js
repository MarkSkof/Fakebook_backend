'use strict';
const { truncate } = require('fs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like_dislike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Post }) {
		this.belongsTo(User, { foreignKey: "userId" })
		this.belongsTo(Post, { foreignKey: "postId" })
	}
  }
  Like_dislike.init({
    userId: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4
	},
    postId: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4
	},
    like_dislike: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Like_dislike',
  });
  return Like_dislike;
};
