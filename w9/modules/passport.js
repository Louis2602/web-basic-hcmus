const passport = require('passport');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');
const MyStrategy = require('./strategy');

passport.serializeUser((user, done) => {
	done(null, user.Username);
});

passport.deserializeUser(async (user, done) => {
	const foundUser = await UserModel.getUser(user);

	if (foundUser) {
		return done(null, foundUser);
	}

	done('Invalid User');
});

module.exports = (app) => {
	app.use(passport.initialize());
	app.use(passport.session());

	passport.use(
		new MyStrategy(async (username, password, done) => {
			try {
				const user = await UserModel.getUser(username);
				const rs = await bcrypt.compare(password, user.Password);
				if (rs) {
					return done(null, user);
				}
				done('Invalid authentication', null);
			} catch (error) {
				done(error);
			}
		})
	);
};
