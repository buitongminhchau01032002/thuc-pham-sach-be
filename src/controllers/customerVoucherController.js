const CustomerVoucher = require('../models/CustomerVoucher');

// [GET] api/customerVoucher
const read = async (req, res, next) => {
    try {
        let customerVouchers;
        customerVouchers = await CustomerVoucher.find();
        return res.status(200).json({ success: true, customerVouchers });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [POST] api/customerVoucher
const create = async (req, res, next) => {
    try {
        const newCustomerVoucher = new CustomerVoucher(req.body);
        await newCustomerVoucher.save();
        return res.status(201).json({ success: true, customerVoucher: newCustomerVoucher });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [GET] api/customerVoucher/:id
const readOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        let customerVoucher;
        customerVoucher = await CustomerVoucher.findOne({ id });
        return res.status(200).json({ success: true, customerVoucher });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [PUT] api/customerVoucher/:id
const update = async (req, res, next) => {
    const id = Number(req.params.id);
    const bodyObj = req.body;
    const updateObj = {};

    Object.keys(bodyObj).forEach((key) => {
        if (bodyObj[key] !== undefined) {
            updateObj[key] = bodyObj[key];
        }
    });

    // Update customerVoucher
    try {
        const newCustomerVoucher = await CustomerVoucher.findOneAndUpdate({ id }, updateObj, {
            new: true,
        });
        return res.status(200).json({ success: true, customerVoucher: newCustomerVoucher });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [DELETE] api/customerVoucher/:id
const destroy = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json({ success: false, status: 400, message: 'Missed id' });
    }

    try {
        await CustomerVoucher.delete({ id: req.params.id });
        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

module.exports = { read, create, readOne, update, destroy };
