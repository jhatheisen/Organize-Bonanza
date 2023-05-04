'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'OrderProducts';
    return queryInterface.bulkInsert(options, [
      {
        orderId: 1,
        productId: 1,
        quantity: 5
      },
      {
        orderId: 1,
        productId: 5,
        quantity: 3
      },
      {
        orderId: 1,
        productId: 17,
        quantity: 2
      },
      {
        orderId: 2,
        productId: 5,
        quantity: 1
      },
      {
        orderId: 2,
        productId: 9,
        quantity: 10
      },
      {
        orderId: 2,
        productId: 11,
        quantity: 7
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'OrderProducts';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
