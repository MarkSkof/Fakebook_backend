'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_settings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
		this.belongsTo(User, { foreignKey: "userId", as: 'user' });
	}
  }
  User_settings.init({
    userId: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4
	},
    bio: DataTypes.STRING ,
    theme: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "light"
    }
  }, {
    sequelize,
    modelName: 'User_settings',
  });
  return User_settings;
};
