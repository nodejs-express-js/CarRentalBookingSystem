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
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      carId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Cars',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Customers',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      cardType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cardNumber: {
        type: Sequelize.STRING(16),
        allowNull: false,
      },
      cardCVV: {
        type: Sequelize.STRING(3),
        allowNull: false,
      },
      cardHolderName: {
        type: Sequelize.STRING(32),
        allowNull: false,
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