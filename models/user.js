'use strict';
const { Model } = require('sequelize');
const { User_settings } = require('./user_settings');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, Comment, Like_dislike, User_settings }) {
		this.hasMany(Post, { foreignKey: "userId", onDelete: "CASCADE" })
		this.hasMany(Comment, { foreignKey: "userId", onDelete: "CASCADE" })
		this.hasMany(Like_dislike, { foreignKey: "userId", onDelete: "CASCADE" })
		this.hasOne(User_settings, { foreignKey: "userId", onDelete: "CASCADE" })
	}
  }
  User.init({
    id: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false
	},
    email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
    password: {
		type: DataTypes.STRING,
		allowNull: false
	},
    birthDate: {
		type: DataTypes.DATEONLY,
		allowNull: false
	}
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
