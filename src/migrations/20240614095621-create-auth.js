'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('auths', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      access_token: {
        type: Sequelize.STRING
      },
      user_verification_code: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.STRING
      },
      refresh_token: {
        type: Sequelize.STRING
      },
      access_token_expire: {
        type: Sequelize.DATE
      },
      refresh_token_expire: {
        type: Sequelize.DATE
      },
      account_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      terms_and_conditions: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      consent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('auths');
  }
};