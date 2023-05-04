const express = require('express');
const Sequelize = require('sequelize');
const { Product } = require('../../db/models');

const router = express.Router();
const Op = Sequelize.Op;

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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

  // page and size query
  let { page, size } = req.query;

  (!page || isNaN(page)) ? page = 1 : page = parseInt(page);
  (!size || isNaN(size)) ? size = 20 : size = parseInt(size);

  const limit = size;
  const offset = (size * (page - 1));

  const products = await Product.findAll({
    limit,
    offset,
  });

  return res.json({
    Products: products,
    page,
    size
  })
});

const validateCreateProduct = [
  check('name', 'Please provide a valid name.')
    .exists({ checkFalsy: true })
    .notEmpty(),
  check('description', 'Please provide a valid description.')
    .exists({ checkFalsy: true })
    .notEmpty(),
  check('price', 'Please provide a valid price over $.01, with up to 2 decimal points.')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isDecimal({decimal_digits: '2', })
    .isFloat({gt:.01}),
  check('stock', 'Please provide a valid stock value of at least 1.')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isFloat({gt:0}),
  check('imageUrl', 'Please provide a valid imageUrl')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isURL(),
  handleValidationErrors
]

router.post(
  '/',
  validateCreateProduct,
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

  const { name, description, price, stock, imageUrl } = req.body;

  const newProduct = await Product.create({
    name,
    description,
    price,
    stock,
    imageUrl
  });

  return res.json(newProduct);

})

router.put(
  '/:id',
  validateCreateProduct,
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

  const productId = req.params.id;
  const product = await Product.findByPk(productId);

  if (!product) {
    res.status(404);
    return res.json(
      {
        message: "Product couldn't be found",
        statusCode: 404
      }
    );
  }

  const {name, description, price, stock, imageUrl} = req.body;

  product.set({
    name,
    description,
    price,
    stock,
    imageUrl
  });

  await product.save();

  return res.json(product)
});

router.delete('/:id', async (req, res) => {

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

  const productId = req.params.id;
  const product = await Product.findByPk(productId);

  if (!product) {
    res.status(404);
    return res.json(
      {
        message: "Product couldn't be found",
        statusCode: 404
      }
    );
  }

  product.destroy();

  return res.json({
    message: "Successfully deleted",
    statusCode: 200
  })
})

module.exports = router;
