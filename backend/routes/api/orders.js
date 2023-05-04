const express = require('express');
const { Order, Product, OrderProduct } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { route } = require('./products');
const { or } = require('sequelize');

router.get('/', async (req, res) => {
    // authentication 401
    if (req.user === null) {
      res.status(401);
      return res.json(
        {
          message: "Authentication required",
          statusCode: 401
        }
      );
    }

    const orders = await Order.findAll({
      include: Product
    });

    return res.json({Orders: orders})
})

router.get('/:id', async (req, res) => {

  // authentication 401
  if (req.user === null) {
    res.status(401);
    return res.json(
      {
        message: "Authentication required",
        statusCode: 401
      }
    );
  }

  const { id } = req.params;

  let orderProduct = await OrderProduct.findAll({
    where: { orderId: id },
    raw: true,
    nest: true,
    include: [
      {
        model: Product
      }
    ]
  })

  const orderByPK = await Order.findByPk(id)

  orderProduct = orderProduct.map(set => {
    let copySet = Object.assign({}, set);
    delete copySet.Product.stock
    copySet.Product.quantity = copySet.quantity;
    copySet = copySet.Product
    return copySet
  })


  if (!orderProduct) {
    res.status(404);
    return res.json(
      {
        message: "Order couldn't be found",
        statusCode: 404
      }
    );
  }

  return res.json({
    Order: orderByPK,
    products: orderProduct
  });

})

const validateCreateOrder = [
  check('trackingCompany', 'Please provide a tracking company.')
    .exists({ checkFalsy: true })
    .notEmpty(),
  check('trackingNumber', 'Please provide a valid tracking number with only numeric characters.')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isNumeric(),
  check('status', 'Please provide a valid status')
    .exists({ checkFalsy: true })
    .notEmpty(),
  handleValidationErrors
]

router.post('/', validateCreateOrder, async (req, res) => {
    // authentication 401
    if (req.user === null) {
      res.status(401);
      return res.json(
        {
          message: "Authentication required",
          statusCode: 401
        }
      );
    }

    const { trackingCompany, trackingNumber, status} = req.body;

    const newOrder = await Order.create({
      trackingCompany,
      trackingNumber,
      status
    })

    return res.json(newOrder)
})

router.put(
  '/:id',
  validateCreateOrder,
  async (req, res) => {
    // authentication 401
    if (req.user === null) {
      res.status(401);
      return res.json(
        {
          message: "Authentication required",
          statusCode: 401
        }
      );
    }

    const orderId = req.params.id;
    const order = await Order.findByPk(orderId);

    if (!order) {
      res.status(404);
      return res.json(
        {
          message: "Order couldn't be found",
          statusCode: 404
        }
      );
    }

    const { trackingCompany, trackingNumber, status} = req.body;

    order.set({
      trackingCompany,
      trackingNumber,
      status
    });

    await order.save();

    return res.json(order)
  }
)

router.post('/:id/items', async (req, res) => {
  // authentication 401
  if (req.user === null) {
    res.status(401);
    return res.json(
      {
        message: "Authentication required",
        statusCode: 401
      }
    );
  }

  const items = req.body;

  console.log(items)

  const orderId = req.params.id;
  const order = await Order.findByPk(orderId, {
    include: Product
  });

  if (order.Products.length != 0) {
    res.status(400);
      return res.json(
        {
          message: "Order is not empty",
          statusCode: 400
        }
      );
  }

  const itemErrors = [];

  for(item of items) {
    let currProduct = await Product.findByPk(item.id);
    if (currProduct.stock < item.quantity) itemErrors.push(currProduct.name)
  }

  if (itemErrors.length) {
    res.status(400);
    return res.json(
      {
        message: "All listed items do not have enough stock please check the quantity you are trying to add to order.",
        items: itemErrors,
        statusCode:400
      }
    )
  }

  for (item of items) {
    // find product
    let currItem = await Product.findByPk(item.id);
    // change stock value
    currItem.set({stock: currItem.stock - item.quantity});
    await currItem.save();

    // add to order
    let orderProductSet = await OrderProduct.create({
      orderId,
      productId: item.id,
      quantity: item.quantity
    })
  }

  return res.json({
    message: "Successfully added all items",
    statusCode: 200
  })
})

module.exports = router;
