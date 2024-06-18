'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // user.hasMany(models.auth, {
      //   foreignKey: 'user_id',
      //   as: 'auths',
      //   onDelete: 'CASCADE'
      // });
    }
  }
  user.init({
    uuid: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    mobile: {
      type: DataTypes.BIGINT
    },
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    dob: {
      type: DataTypes.DATE
    },
    address1: {
      type: DataTypes.STRING
    },
    address2: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    place: {
      type: DataTypes.STRING
    },
    post_code: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};