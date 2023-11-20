const express = require('express');
const router = express.Router();
const { calculateResult } = require('../controllers/calculatorController');

router.post('/', calculateResult);

module.exports = router;
