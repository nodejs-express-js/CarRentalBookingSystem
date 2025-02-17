'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CarRentals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,

        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,

        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        unique: true,

        type: Sequelize.STRING
      },
      password: {
        allowNull: false,

        type: Sequelize.STRING
      },
      phone: {
        allowNull: false,

        type: Sequelize.STRING
      },
      address: {
        allowNull: false,

        type: Sequelize.STRING
      },
      profilePicture:{
        allowNull: false,

        type: Sequelize.STRING,
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
    await queryInterface.dropTable('CarRentals');
  }
};