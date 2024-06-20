const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserRole.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
        // onDelete: 'CASCADE'
      });
      UserRole.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'role',
        // onDelete: 'CASCADE'
      });
    }
  }
  UserRole.init({
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles', // table name
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // table name
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'UserRole', // Capitalize the model name
    tableName: 'user_roles', // Ensure the table name is correct
  });
  return UserRole;
};
