const pool = require('../db');

const User = {
	getUsersFromAPI: async () => {
		try {
			const response = await fetch(
				'https://reqres.in/api/users?per_page=12'
			);
			const data = await response.json();
			return data.data;
		} catch (error) {
			throw new Error('Failed to fetch users from the API');
		}
	},
	saveUsersToDB: async () => {
		const users = await User.getUsersFromAPI();
		try {
			const insertQuery =
				'INSERT INTO users (id, email, first_name, last_name, avatar) VALUES ($1, $2, $3, $4, $5)';
			await Promise.all(
				users.map(async (user) => {
					await pool.query(insertQuery, [
						user.id,
						user.email,
						user.first_name,
						user.last_name,
						user.avatar,
					]);
				})
			);
			return 'Save users to database successfully';
		} catch (error) {
			throw new Error('Failed to save users to the database');
		}
	},
	getUsers: async (page = 1, per_page = 2) => {
		try {
			const offset = (page - 1) * per_page;
			const query = 'SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2';
			const users = await pool.query(query, [per_page, offset]);

			return users.rows;
		} catch (error) {
			throw new Error('Failed to get users with pagination');
		}
	},
	getTotalUsersCount: async () => {
		try {
			const query = 'SELECT COUNT(*) FROM users';
			const result = await pool.query(query);

			const totalCount = parseInt(result.rows[0].count);
			return totalCount;
		} catch (error) {
			throw new Error('Failed to get total users count');
		}
	},
	addUser: async (newUser) => {
		try {
			const insertQuery =
				'INSERT INTO users (first_name, last_name, email, avatar) VALUES ($1, $2, $3, $4)';
			const res = await pool.query(insertQuery, [
				newUser.first_name,
				newUser.last_name,
				newUser.email,
				newUser.avatar,
			]);
			return 'Add new user successfully';
		} catch (error) {
			throw new Error('Failed to add new user');
		}
	},
	getUserById: async (userId) => {
		try {
			const user = await pool.query('SELECT * FROM users WHERE id = $1', [
				userId,
			]);
			return user.rows[0];
		} catch (err) {
			throw new Error('Failed to get user information');
		}
	},
	deleteUser: async (userId) => {
		try {
			await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [
				userId,
			]);
			return 'Delete user successfully';
		} catch (err) {
			throw new Error('Failed to delete user');
		}
	},
	updateUser: async (updatedUser) => {
		try {
			const updateQuery =
				'UPDATE users SET first_name = $1, last_name = $2, email = $3, avatar = $4 WHERE id = $5';
			await pool.query(updateQuery, [
				updatedUser.first_name,
				updatedUser.last_name,
				updatedUser.email,
				updatedUser.avatar,
				updatedUser.id,
			]);
			return 'User updated successfully';
		} catch (error) {
			throw new Error('Failed to update user');
		}
	},
	searchUsers: async (searchQuery) => {
		try {
			const query =
				' SELECT * FROM users WHERE first_name LIKE $1 OR last_name LIKE $1 OR email LIKE $1';
			const users = await pool.query(query, [`%${searchQuery}%`]);
			return users.rows;
		} catch (error) {
			throw new Error('Failed to update user');
		}
	},
};

module.exports = User;
