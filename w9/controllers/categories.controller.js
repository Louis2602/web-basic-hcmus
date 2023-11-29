const CategoriesModel = require('../models/categories.model');
const ProductsModel = require('../models/products.model');

const categoriesController = {
	getCategoriesPage: async (req, res, next) => {
		try {
			const categories = await CategoriesModel.getCategories();
			res.render('categories', {
				title: 'Categories Management',
				categories: categories,
			});
		} catch (error) {
			next(err);
		}
	},
	getProductsOfCategories: async (req, res, next) => {
		try {
			const catId = req.params.catId;
			const cat = await CategoriesModel.getCategoryById(catId);
			const products = await ProductsModel.getProductsByCatID(catId);
			res.render('products', {
				title: 'Products',
				products: products,
				catName: cat.CatName,
			});
		} catch (error) {
			next(err);
		}
	},
	deleteCategory: async (req, res, next) => {
		try {
			const catId = req.params.catId;
			await CategoriesModel.deleteCategoryById(catId);
			res.status(200).json({ message: 'Delete category successfully' });
		} catch (err) {
			next(err);
		}
	},
	addNewCategory: async (req, res, next) => {
		try {
			const { CatName } = req.body;
			await CategoriesModel.addNewCategory(CatName);
			res.status(200).json({ message: 'Add new category successfully' });
		} catch (err) {
			next(err);
		}
	},
	editCategory: async (req, res, next) => {
		try {
			const catId = req.params.catId;
			console.log(
				'🚀 ~ file: categories.controller.js:51 ~ editCategory: ~ catId:',
				catId
			);
			const { CatName } = req.body;
			await CategoriesModel.editCategory(catId, CatName);
			res.status(200).json({ message: 'Edit category successfully' });
		} catch (err) {
			next(err);
		}
	},
};

module.exports = categoriesController;
