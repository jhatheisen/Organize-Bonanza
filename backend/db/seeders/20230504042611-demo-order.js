'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Orders';
    return queryInterface.bulkInsert(options, [
      {
        trackingCompany: 'FedEX',
        trackingNumber: 123456,
        status: 'processing'
      },
      {
        trackingCompany: 'USPS',
        trackingNumber: 654321,
        status: 'delivered'
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Orders';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      trackingNumber: { [Op.in]: [123456, 654321] }
    }, {});
  }
};
