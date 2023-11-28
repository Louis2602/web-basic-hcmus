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
};

module.exports = categoriesController;
