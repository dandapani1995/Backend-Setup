const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Auth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      Auth.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  Auth.init({
    access_token: {
      type: DataTypes.STRING
    },
    user_verification_code: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // References the 'users' table
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
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
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Auth',
    tableName: 'auth', // Explicitly define table name
  });

  return Auth;
};
