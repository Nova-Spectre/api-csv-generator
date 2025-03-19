const express = require('express');
const router = express.Router();
const csvController = require('../controllers/csv.controller');

router.get('/generate-csv', csvController.generateCsv);

module.exports = router;