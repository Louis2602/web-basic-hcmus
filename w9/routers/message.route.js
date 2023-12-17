const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');

router.get('/message-poll', messageController.getMessagePage);
router.get('/message-socket', messageController.getSocketPage);
router.post('/', messageController.sendMessage);
router.get('/poll', messageController.getMessage);

module.exports = router;
