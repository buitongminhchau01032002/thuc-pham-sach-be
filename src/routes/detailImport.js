const express = require('express');
const router = express.Router();
const detailImportController = require('../controllers/detailImportController');

router.get('/', detailImportController.read);

module.exports = router;
