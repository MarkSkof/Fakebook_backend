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
    static associate({ User, Comment, Like}) {
		this.belongsTo(User, { foreignKey: "userId", as: 'user' });
		this.hasMany(Comment, { foreignKey: "postId", as: 'comments', onDelete: "CASCADE" })
		this.hasMany(Like, { foreignKey: "postId", as: "likes", onDelete: "CASCADE" })
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
    body: DataTypes.STRING,
    media: DataTypes.STRING,
    media_type: DataTypes.ENUM('IMAGE', 'VIDEO'),
  }, {
    sequelize,
    modelName: 'Post',
    validate: {
        fieldsMustHaveValueOrBeNull() {
            if ((this.media === null && this.media_type !== null) || (this.media !== null && this.media_type === null)) {
                throw new Error('Both media and media_type must either be null or have values.');
            }
        },
        atLeastOneContentFieldMustHaveValue() {
            if (this.media === null && this.body === null) {
                throw new Error("Eater 'media' or 'body' is required");
            }
        }
    }
  });
  return Post;
};
