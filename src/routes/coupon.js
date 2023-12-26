const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');

router.get('/get-by-customer/:customerId', couponController.getByCustomer);
router.get('/:id', couponController.readOne);
router.get('/', couponController.read);
router.post('/', couponController.create);
router.put('/:id', couponController.update);
router.delete('/:id', couponController.destroy);

module.exports = router;
