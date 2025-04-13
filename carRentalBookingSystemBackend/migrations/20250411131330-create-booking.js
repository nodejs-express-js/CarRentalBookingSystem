'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookingDate: {
        type: Sequelize.DATEONLY
      },
      carId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cars',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      customerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Customers',
          key: 'id'
        },
        onDelete: 'CASCADE'
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
    await queryInterface.addConstraint('Bookings', {
      fields: ['bookingDate', 'carId'],
      type: 'unique',
      name: 'unique_booking_date_car_id' // Optional, but recommended: give the constraint a name
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};