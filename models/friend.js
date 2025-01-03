'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
		this.belongsTo(User, { foreignKey: "userAId", as: 'userA' });
		this.belongsTo(User, { foreignKey: "userBId", as: "userB" })
	}
  }
  Friend.init({
    userAId: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4
	},
    userBId: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4
	},
  }, {
    sequelize,
    modelName: 'Friend',
  });
  return Friend;
};
