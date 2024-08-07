const db = require('../db');
const { randomId } = require('../utils/generateRandomId');

const UserModel = {
	addUser: async (username, password, email, fullname, dob) => {
		try {
			const userId = randomId();
			await db.none(
				'INSERT INTO "Users" ("ID", "Username", "Password", "Name", "Email", "DOB", "Permission") VALUES ($1, $2, $3, $4, $5, $6, $7)',
				[userId, username, password, fullname, email, dob, 0]
			);
		} catch (err) {
			console.log(err);
		}
	},
	getUser: async (username) => {
		try {
			const user = await db.oneOrNone(
				'SELECT * FROM "Users" WHERE "Username" = $1',
				[username]
			);
			return user;
		} catch (err) {
			console.log(err);
		}
	},
};

module.exports = UserModel;
