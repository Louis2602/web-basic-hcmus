const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');
const server = 1;

router.get('/', messageController.getMessagePage);
router.post('/', messageController.sendMessage);
router.get('/poll', messageController.getMessage);

module.exports = router;
