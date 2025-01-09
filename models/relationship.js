'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Relationship extends Model {
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
  Relationship.init({
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
    status: {
        type: DataTypes.ENUM('FRIEND_REQUEST', 'FRIEND', 'BLOCKED'),
        allowNull: false,
        defaultValue: 'FRIEND_REQUEST'
    }
  }, {
    sequelize,
    modelName: 'Relationship',
  });
  return Relationship;
};
