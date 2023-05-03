'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Products';
    return queryInterface.bulkInsert(options, [
      {
        name: 'Hat',
        description: 'Wool Blend',
        price: 20.00,
        stock: 5,
        imageUrl: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
      },
      {
        name: 'Sunglasses',
        description: 'Polarized',
        price: 45.99,
        stock: 1,
        imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80'
      },
      {
        name: 'Backpack',
        description: 'Waterproof',
        price: 69.95,
        stock: 2,
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
      },
      {
        name: 'Phone Case',
        description: 'Silicone',
        price: 12.50,
        stock: 10,
        imageUrl: 'https://images.unsplash.com/photo-1623393945964-8f5d573f9358?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
      },
      {
        name: 'Yoga Mat',
        description: 'Non-Slip',
        price: 29.99,
        stock: 3,
        imageUrl: 'https://cdn.pixabay.com/photo/2015/03/30/08/53/yoga-698114_960_720.jpg'
      },
      {
        name: 'Bluetooth Speaker',
        description: 'Portable',
        price: 89.00,
        stock: 1,
        imageUrl: 'https://cdn.pixabay.com/photo/2017/06/04/16/52/speaker-2371550_960_720.jpg'
      },
      {
        name: 'Coffee Mug',
        description: 'Ceramic',
        price: 15.75,
        stock: 6,
        imageUrl: 'https://cdn.pixabay.com/photo/2016/01/02/04/59/coffee-1117933_960_720.jpg'
      },
      {
        name: 'Resistance Bands',
        description: 'Set of 3',
        price: 19.99,
        stock: 4,
        imageUrl: 'https://cdn.pixabay.com/photo/2021/06/28/13/53/resistance-bands-6371695_960_720.jpg'
      },
      {
        name: 'Protein Powder',
        description: 'Whey Isolate',
        price: 44.95,
        stock: 1,
        imageUrl: 'https://img.freepik.com/free-vector/sport-nutrition-container_1284-6580.jpg?w=1060&t=st=1683070470~exp=1683071070~hmac=2afd00f56e45b51b902798a0cf68e858a79c6fa8b534a41fa50e8843574465dd'
      },
      {
        name: 'Laptop Sleeve',
        description: 'Neoprene',
        price: 24.50,
        stock: 8,
        imageUrl: 'https://img.freepik.com/premium-psd/flat-canvas-pouch-mockup-design_23-2149051351.jpg?w=1060'
      },
      {
        name: 'Hat2',
        description: 'Wool Blend',
        price: 20.00,
        stock: 5,
        imageUrl: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
      },
      {
        name: 'Sunglasses2',
        description: 'Polarized',
        price: 45.99,
        stock: 1,
        imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80'
      },
      {
        name: 'Backpack2',
        description: 'Waterproof',
        price: 69.95,
        stock: 2,
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
      },
      {
        name: 'Phone Case2',
        description: 'Silicone',
        price: 12.50,
        stock: 10,
        imageUrl: 'https://images.unsplash.com/photo-1623393945964-8f5d573f9358?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
      },
      {
        name: 'Yoga Mat2',
        description: 'Non-Slip',
        price: 29.99,
        stock: 3,
        imageUrl: 'https://cdn.pixabay.com/photo/2015/03/30/08/53/yoga-698114_960_720.jpg'
      },
      {
        name: 'Bluetooth Speaker2',
        description: 'Portable',
        price: 89.00,
        stock: 1,
        imageUrl: 'https://cdn.pixabay.com/photo/2017/06/04/16/52/speaker-2371550_960_720.jpg'
      },
      {
        name: 'Coffee Mug2',
        description: 'Ceramic',
        price: 15.75,
        stock: 6,
        imageUrl: 'https://cdn.pixabay.com/photo/2016/01/02/04/59/coffee-1117933_960_720.jpg'
      },
      {
        name: 'Resistance Bands2',
        description: 'Set of 3',
        price: 19.99,
        stock: 4,
        imageUrl: 'https://cdn.pixabay.com/photo/2021/06/28/13/53/resistance-bands-6371695_960_720.jpg'
      },
      {
        name: 'Protein Powder2',
        description: 'Whey Isolate',
        price: 44.95,
        stock: 1,
        imageUrl: 'https://img.freepik.com/free-vector/sport-nutrition-container_1284-6580.jpg?w=1060&t=st=1683070470~exp=1683071070~hmac=2afd00f56e45b51b902798a0cf68e858a79c6fa8b534a41fa50e8843574465dd'
      },
      {
        name: 'Laptop Sleeve2',
        description: 'Neoprene',
        price: 24.50,
        stock: 8,
        imageUrl: 'https://img.freepik.com/premium-psd/flat-canvas-pouch-mockup-design_23-2149051351.jpg?w=1060'
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Products';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Hat',
      'Sunglasses',
      'Backpack',
      'Phone Case',
      'Yoga Mat',
      'Bluetooth Speaker',
      'Coffee Mug',
      'Resistance Bands',
      'Protein Powder',
      'Laptop Sleeve']}
    }, {});
  }
};
