const express = require('express');
const router = express.Router();
const recommendController = require('../controllers/recommendController');

router.get('/:userId', recommendController.recommend);

module.exports = router;
