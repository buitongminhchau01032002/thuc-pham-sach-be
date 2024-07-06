const Voucher = require('../models/Voucher');
const CustomerVoucher = require('../models/CustomerVoucher');

// [GET] api/voucher
const read = async (req, res, next) => {
    try {
        let vouchers;
        vouchers = await Voucher.find();
        return res.status(200).json({ success: true, vouchers });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [POST] api/voucher
const create = async (req, res, next) => {
    try {
        const newVoucher = new Voucher(req.body);
        await newVoucher.save();
        return res.status(201).json({ success: true, voucher: newVoucher });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [GET] api/voucher/:id
const readOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        let voucher;
        voucher = await Voucher.findOne({ id });
        return res.status(200).json({ success: true, voucher });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

const readActiveByCustomerId = async (req, res, next) => {
    const id = req.params.id;
    try {
        const customerVouchers = await CustomerVoucher.find({ customerId: id, status: 'active' });
        const vouchers = await Voucher.find();
        const result = customerVouchers
            .map((cv) => {
                const voucher = vouchers.find((v) => v.id === cv.voucherId);
                if (voucher) {
                    return {
                        ...voucher.toObject(),
                        id: cv.id,
                    };
                }
                return null;
            })
            .filter((v) => v);
        console.log(result);
        return res.status(200).json({
            success: true,
            vouchers: result,
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [PUT] api/voucher/:id
const update = async (req, res, next) => {
    const id = Number(req.params.id);
    const bodyObj = req.body;
    const updateObj = {};

    Object.keys(bodyObj).forEach((key) => {
        if (bodyObj[key] !== undefined) {
            updateObj[key] = bodyObj[key];
        }
    });

    // Update voucher
    try {
        const newVoucher = await Voucher.findOneAndUpdate({ id }, updateObj, {
            new: true,
        });
        return res.status(200).json({ success: true, voucher: newVoucher });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [DELETE] api/voucher/:id
const destroy = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json({ success: false, status: 400, message: 'Missed id' });
    }

    try {
        await Voucher.delete({ id: req.params.id });
        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

module.exports = { read, create, readOne, update, destroy, readActiveByCustomerId };
