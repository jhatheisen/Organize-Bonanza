const express = require('express');
const Sequelize = require('sequelize');
const { Product } = require('../../db/models');

const router = express.Router();
const Op = Sequelize.Op;

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/', async (req, res) => {
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

module.exports = router;
