'use strict';
const { truncate } = require('fs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Post }) {
		this.belongsTo(User, { foreignKey: "userId", as: 'user' });
		this.belongsTo(Post, { foreignKey: "postId", as: 'post' });
	}
  }
  Like.init({
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
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};
