const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/signin', userController.getSignInPage);
router.get('/signup', userController.getSignUpPage);
router.post('/signin', userController.signIn);
router.post('/signup', userController.signUp);
router.post('/signout', userController.signOut);

module.exports = router;
