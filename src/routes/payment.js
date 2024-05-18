const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/create-trans', paymentController.createTrans);
router.post('/get-trans-status/:id', paymentController.getTransStatus);

module.exports = router;
