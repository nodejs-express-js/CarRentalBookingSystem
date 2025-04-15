'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Car, {foreignKey: 'carId', as:"car"});
      Booking.belongsTo(models.Customer,{foreignKey: 'customerId', as:"customer"})
    }
  }
  Booking.init({
    bookingDate: DataTypes.DATEONLY,
    carId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    cardType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cardNumber: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    cardCVV: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    cardHolderName: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};