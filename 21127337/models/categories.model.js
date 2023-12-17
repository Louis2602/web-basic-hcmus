const db = require('../db');
const { randomId } = require('../utils/generateRandomId');

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
	deleteCategoryById: async (catId) => {
		try {
			await db.none('DELETE FROM "Categories" WHERE "CatID" = $1', [
				catId,
			]);
		} catch (err) {
			console.log(err);
		}
	},
	addNewCategory: async (CatName) => {
		try {
			const catId = randomId();
			await db.none(
				'INSERT INTO "Categories" ("CatID", "CatName") VALUES ($1, $2)',
				[catId, CatName]
			);
		} catch (err) {
			console.log(err);
		}
	},
	editCategory: async (catId, CatName) => {
		try {
			await db.none(
				'UPDATE "Categories" SET "CatName" = $1 WHERE "CatID" = $2',
				[CatName, catId]
			);
		} catch (err) {
			console.log(err);
		}
	},
};

module.exports = CategoriesModel;
