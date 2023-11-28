const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories.controller');

router.get('/', categoriesController.getCategoriesPage);
router.get('/:catId/products', categoriesController.getProductsOfCategories);

module.exports = router;
