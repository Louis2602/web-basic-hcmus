const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories.controller');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { randomId } = require('../utils/generateRandomId');

// SET STORAGE
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// Set the directory where you want to store the files
		const proId = randomId();
		req.params.proId = proId;
		const uploadDir = `./pid/${proId}`; // Directory for the specific catId
		fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if it doesn't exist
		cb(null, uploadDir);
	},
	filename: function (req, file, cb) {
		// Set the file name (you can modify this to suit your requirements)
		cb(null, 'main_thumbs' + path.extname(file.originalname));
	},
});

var upload = multer({ storage: storage });

router.post(
	'/:catId/products/add',
	upload.single('thumbnail'),
	categoriesController.addNewProduct
);
router.delete('/:catId/products/:proId', categoriesController.deleteProduct);
router.post('/products/:proId/edit', categoriesController.editProduct);

router.get('/', categoriesController.getCategoriesPage);
router.get('/:catId/products', categoriesController.getProductsOfCategories);
router.delete('/:catId', categoriesController.deleteCategory);
router.post('/', categoriesController.addNewCategory);
router.patch('/:catId', categoriesController.editCategory);

module.exports = router;
