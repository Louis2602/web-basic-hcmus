const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const passport = require('passport');

router.get('/signin', userController.getSignInPage);
router.post(
	'/signin',
	passport.authenticate('myStrategy', {
		failureRedirect: '/auth/signin',
	}),
	(req, res) => {
		res.redirect('/categories');
	}
);
router.use((req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/auth/signin');
});
router.get('/signup', userController.getSignUpPage);
router.post('/signup', userController.signUp);
router.get('/signout', userController.signOut);

module.exports = router;
