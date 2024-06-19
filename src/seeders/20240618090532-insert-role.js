'use strict';

const { roleData } = require('../utills/constant');
const { roles } = require("../models/index");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /** Add seed commands here.*/

    const rolesExe = await roles.findAll({ attributes: ['id', 'role', 'name'] });
    const result = roleData.filter(item1 => !rolesExe.some(item2 => item1.role == item2.role && item1.name == item2.name));
    if (result && result.length > 0) {
      await queryInterface.bulkInsert('roles', roleData, {});
    }
  },
  async down(queryInterface, Sequelize) {
    /** Add commands to revert seed here.*/
    await queryInterface.bulkDelete('roles', null, {});
  }
};
