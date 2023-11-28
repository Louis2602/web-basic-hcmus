const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');

const userController = {
	getSignInPage: async (req, res, next) => {
		try {
			res.render('signin', {
				title: 'Sign In',
			});
		} catch (error) {
			next(err);
		}
	},
	getSignUpPage: async (req, res, next) => {
		try {
			res.render('signup', {
				title: 'Sign Up',
			});
		} catch (error) {
			next(err);
		}
	},
	signUp: async (req, res, next) => {
		try {
			const { username, password, fullname, email, dob } = req.body;
			bcrypt.hash(password, 10, async function (err, hash) {
				if (err) {
					return next(err);
				}

				await UserModel.addUser(username, hash, email, fullname, dob);
				res.redirect('/');
			});
		} catch (err) {
			next(err);
		}
	},

	signIn: async (req, res, next) => {
		try {
			const { username, password } = req.body;
			const foundUser = await UserModel.getUser(username);
			if (!foundUser) return;
			bcrypt.compare(
				password,
				foundUser.Password,
				function (err, result) {
					if (err) {
						return next(err);
					}
					if (result) {
						req.session.user = foundUser;
					}
					res.redirect('/');
				}
			);
		} catch (err) {
			next(err);
		}
	},
	signOut: async (req, res, next) => {
		try {
			req.session.user = null;
			req.session.destroy((err) => {
				if (err) {
					return next(err);
				}
				res.redirect('/auth/signin');
			});
		} catch (err) {
			next(err);
		}
	},
};

module.exports = userController;
