'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, Comment, Like, User_settings, Profile }) {
		this.hasMany(Post, { foreignKey: "userId", as: 'posts', onDelete: "CASCADE" })
		this.hasMany(Comment, { foreignKey: "userId", as: 'comments', onDelete: "CASCADE" })
		this.hasMany(Like, { foreignKey: "userId", as: 'likes', onDelete: "CASCADE" })
		this.hasOne(User_settings, { foreignKey: "userId", as: 'settings', onDelete: "CASCADE" })
		this.hasOne(Profile, { foreignKey: "userId", as: 'profile', onDelete: "CASCADE" })
	}
  }
  User.init({
    id: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4
	},
	firstname: {
		type: DataTypes.STRING,
		allowNull: false
	},
	lastname: {
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
	validate: {
		isValidAge() {
			const date = new Date(this.birthDate)
			const dateNow = new Date();
			dateNow.setFullYear(dateNow.getFullYear() - 18)
			if (dateNow < date) {
				throw Error("You must be at least 18 years old to use this app.");
			}
		}
	}
  });

  return User;
};
