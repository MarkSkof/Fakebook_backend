'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Saved_post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Post }) {
      this.belongsTo(Post, {foreignKey: 'postId', as: 'post'});
      this.belongsTo(User, {foreignKey: 'userId', as: 'user'});
    }
  }
  Saved_post.init({
    userId: DataTypes.UUID,
    postId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Saved_post',
  });
  return Saved_post;
};