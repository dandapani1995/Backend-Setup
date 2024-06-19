'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // auth.belongsTo(models.User, {
      //   foreignKey: 'user_id',
      //   as: 'user',
      //   onDelete: 'CASCADE'
      // });
    }
  }
  auth.init({
    access_token: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: 'users', // table name
        key: 'uuid'
      },
      onDelete: 'CASCADE'
    },
    user_verification_code: {
      type: DataTypes.STRING
    },
    refresh_token: {
      type: DataTypes.STRING
    },
    access_token_expire: {
      type: DataTypes.DATE
    },
    refresh_token_expire: {
      type: DataTypes.DATE
    },
    account_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    terms_and_conditions: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    consent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'auth',
  });
  return auth;
};