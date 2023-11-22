const User = require('../models/user.model');

const userController = {
	getAllUsers: async (req, res) => {
		try {
			const page = parseInt(req.query.page) || 1;
			const per_page = 4;
			const users = await User.getUsers(page, per_page);
			const totalUsersCount = await User.getTotalUsersCount();
			const totalPages = Math.ceil(totalUsersCount / per_page);

			res.render('userList', { users, totalPages, currentPage: page });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},
	saveData: async (req, res) => {
		try {
			const msg = await User.saveUsersToDB();
			res.status(200).json({ message: msg });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},
	addNewUser: async (req, res) => {
		res.render('addUser');
	},
	getUserDetail: async (req, res) => {
		try {
			const userId = req.params.userId;
			const user = await User.getUserById(userId);

			res.render('user/userInfo', { user });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	searchUsers: async (req, res) => {
		try {
			const searchQuery = req.query.query;
			const foundUsers = await User.searchUsers(searchQuery);

			res.render('search/searchPage', {
				users: foundUsers,
			});
		} catch (error) {
			console.error('Error searching users:', error);
			res.status(500).send(error);
		}
	},
	addUser: async (req, res) => {
		try {
			const newUser = req.body;
			const msg = await User.addUser(newUser);
			res.status(200).json({ message: msg });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	updateUser: async (req, res) => {
		try {
			const updatedUser = req.body;
			const msg = await User.updateUser(updatedUser);
			res.status(200).json({ message: msg });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	deleteUser: async (req, res) => {
		try {
			const userId = req.params.userId;
			const msg = await User.deleteUser(userId);
			res.status(200).json({ message: msg });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	getUpdatePage: async (req, res) => {
		try {
			const userId = req.params.userId;
			const user = await User.getUserById(userId);
			res.render('user/updateUserInfo', { user });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
};

module.exports = userController;
