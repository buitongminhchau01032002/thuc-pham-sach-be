const express = require('express');
const router = express.Router();
const detailOrderController = require('../controllers/detailOrderController');

router.get('/find-by-order-id/:id', detailOrderController.findByOrderId);
router.get('/:id', detailOrderController.readOne);
router.get('/', detailOrderController.read);

module.exports = router;
