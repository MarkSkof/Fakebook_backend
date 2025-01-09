'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, {foreignKey: 'userId', as: 'user'});
    }
  }
  Profile.init({
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'default.jpg'
    },
    bannerImage: DataTypes.STRING,
    bio: DataTypes.STRING,
    lives: DataTypes.STRING,
    school: DataTypes.STRING,
    work: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};