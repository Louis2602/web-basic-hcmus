const db = require('../db');

const ProductsModel = {
	getProductsByCatID: async (catId) => {
		try {
			const products = await db.manyOrNone(
				'SELECT * FROM "Products" WHERE "CatID" = $1',
				[catId]
			);
			return products;
		} catch (err) {
			console.log(err);
		}
	},
};

module.exports = ProductsModel;
