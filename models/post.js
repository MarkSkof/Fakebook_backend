'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Comment, Like_dislike }) {
		this.belongsTo(User, { foreignKey: "userId" })
		this.hasMany(Comment, { foreignKey: "postId", onDelete: "CASCADE" })
		this.hasMany(Like_dislike, { foreignKey: "postId", onDelete: "CASCADE" })
	}
  }
  Post.init({
    id: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4
	},
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    media: DataTypes.STRING,
    isPrivate: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
