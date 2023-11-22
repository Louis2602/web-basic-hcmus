const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/users', userController.getAllUsers);
router.get('/save-data', userController.saveData);
router.get('/add-new-user', userController.addNewUser);
router.get('/users/:userId', userController.getUserDetail);
router.get('/search-users', userController.searchUsers);
router.post('/user', userController.addUser);
router.patch('/user/:userId', userController.updateUser);
router.get('/update-user-info/:userId', userController.getUpdatePage);
router.delete('/user/:userId', userController.deleteUser);

module.exports = router;
