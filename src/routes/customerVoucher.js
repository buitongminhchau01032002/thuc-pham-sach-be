const express = require('express');
const router = express.Router();
const customerVoucherController = require('../controllers/customerVoucherController');

router.get('/:id', customerVoucherController.readOne);
router.get('/', customerVoucherController.read);
router.post('/', customerVoucherController.create);
router.put('/:id', customerVoucherController.update);
router.delete('/:id', customerVoucherController.destroy);

module.exports = router;
