const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories.controller');

router.get('/', categoriesController.getCategoriesPage);
router.get('/:catId/products', categoriesController.getProductsOfCategories);
router.delete('/:catId', categoriesController.deleteCategory);
router.post('/', categoriesController.addNewCategory);
router.patch('/:catId', categoriesController.editCategory);

module.exports = router;
