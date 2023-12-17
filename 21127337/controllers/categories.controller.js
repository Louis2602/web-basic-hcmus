const CategoriesModel = require('../models/categories.model');
const ProductsModel = require('../models/products.model');
const fs = require('fs');

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
				catId: catId,
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
			const { CatName } = req.body;
			await CategoriesModel.editCategory(catId, CatName);
			res.status(200).json({ message: 'Edit category successfully' });
		} catch (err) {
			next(err);
		}
	},
	addNewProduct: async (req, res, next) => {
		try {
			const { name, desc, price, quantity } = req.body;
			const catId = req.params.catId;
			const proId = req.params.proId;
			const file = req.file;
			const newProduct = {
				name,
				desc,
				price,
				quantity,
				catId,
				proId,
			};
			await ProductsModel.addNewProduct(newProduct);
			if (!file) {
				const error = new Error('Please upload a file');
				error.httpStatusCode = 400;
				return next(error);
			}
			res.redirect(`/categories/${catId}/products`);
		} catch (err) {
			next(err);
		}
	},
	deleteProduct: async (req, res, next) => {
		try {
			const catId = req.params.catId;
			const proId = req.params.proId;
			await ProductsModel.deleteProductById(proId, catId);
			fs.rmSync(`./imgs/${proId}`, { recursive: true, force: true });
			res.status(200).json({
				message: 'Delete product successfully',
				ok: true,
			});
		} catch (err) {
			next(err);
		}
	},
	editProduct: async (req, res, next) => {
		try {
			const proId = req.params.proId;
			const updatedProduct = req.body;
			await ProductsModel.editProduct(proId, updatedProduct);
			res.redirect('/categories');
		} catch (err) {
			next(err);
		}
	},
};

module.exports = categoriesController;
