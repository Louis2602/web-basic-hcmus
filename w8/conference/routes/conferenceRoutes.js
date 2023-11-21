const express = require('express');
const router = express.Router();
const conferenceController = require('../controllers/conferenceController');

router.get('/', conferenceController.getHomepage);
router.get('/confirmation', conferenceController.getConfirmationPage);
router.post('/confirmation', conferenceController.postConfirmationDetails);
router.get('/feedback', conferenceController.getFeedbackPage);

module.exports = router;
