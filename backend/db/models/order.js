'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsToMany(models.Product, {
        through: models.OrderProduct,
      });
    }
  }
  Order.init({
    trackingCompany: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    trackingNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
