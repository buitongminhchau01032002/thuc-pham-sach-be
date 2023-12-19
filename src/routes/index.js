const express = require('express');
const router = express.Router();
const productRoute = require('./product');
const productTypeRoute = require('./productType');
const customerRoute = require('./customer');
const orderRoute = require('./order');
const detailOrder = require('./detailOrder');
const account = require('./account');
const role = require('./role');
const auth = require('./auth');
const func = require('./function');
const upload = require('./upload');
const _import = require('./import');

router.use('/product', productRoute);
router.use('/product-type', productTypeRoute);
router.use('/customer', customerRoute);
router.use('/order', orderRoute);
router.use('/detail-order', detailOrder);
router.use('/account', account);
router.use('/role', role);
router.use('/auth', auth);
router.use('/function', func);
router.use('/upload', upload);
router.use('/import', _import);

module.exports = router;
