const { default: mongoose } = require('mongoose');
const DetailOrder = require('../models/DetailOrder');

// [GET] api/detailOrder
const read = async (req, res, next) => {
    try {
        let detailOrders;
        detailOrders = await DetailOrder.find();
        return res.status(200).json({ success: true, detailOrders });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [GET] api/detailOrder
const findByOrderId = async (req, res, next) => {
    const id = req.params.id;
    try {
        let detailOrders;
        detailOrders = await DetailOrder.find({ order: id });
        return res.status(200).json({ success: true, detailOrders });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [GET] api/detail-order/:id
const readOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        let detailOrder;
        detailOrder = await DetailOrder.findOne({ id });
        return res.status(200).json({ success: true, detailOrder });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

module.exports = { read, readOne, findByOrderId };
