const express = require('express');
const router = express.Router();
const voucherController = require('../controllers/voucherController');

router.get('/get-active-by-customer-id/:id', voucherController.readActiveByCustomerId);
router.get('/:id', voucherController.readOne);
router.get('/', voucherController.read);
router.post('/', voucherController.create);
router.put('/:id', voucherController.update);
router.delete('/:id', voucherController.destroy);

module.exports = router;
