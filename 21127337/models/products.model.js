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
	addNewProduct: async (newProduct) => {
		try {
			await db.none(
				'INSERT INTO "Products" ("ProID", "ProName", "TinyDes", "FullDes", "Price", "Quantity", "CatID") VALUES ($1, $2, $3, $4, $5, $6, $7)',
				[
					newProduct.proId,
					newProduct.name,
					newProduct.desc,
					'<UL>',
					newProduct.price,
					newProduct.quantity,
					newProduct.catId,
				]
			);
		} catch (err) {
			console.log(err);
		}
	},
	deleteProductById: async (proId, catId) => {
		try {
			await db.none(
				'DELETE FROM "Products" WHERE "ProID" = $1 AND "CatID" = $2',
				[proId, catId]
			);
		} catch (err) {
			console.log(err);
		}
	},
	editProduct: async (proId, updatedProduct) => {
		try {
			const { name, desc, price, quantity } = updatedProduct;
			await db.none(
				'UPDATE "Products" SET "ProName" = $1, "TinyDes" = $2, "Price" = $3, "Quantity" = $4 WHERE "ProID" = $5',
				[name, desc, price, quantity, proId]
			);
		} catch (err) {
			console.log(err);
		}
	},
};

module.exports = ProductsModel;
