const db = require('../db');

const CategoriesModel = {
	getCategoryById: async (catId) => {
		try {
			const category = await db.oneOrNone(
				'SELECT * FROM "Categories" WHERE "CatID" = $1',
				[catId]
			);
			return category;
		} catch (err) {
			console.log(err);
		}
	},
	getCategories: async () => {
		try {
			const categories = await db.manyOrNone(
				'SELECT * FROM "Categories"'
			);
			return categories;
		} catch (err) {
			console.log(err);
		}
	},
};

module.exports = CategoriesModel;
