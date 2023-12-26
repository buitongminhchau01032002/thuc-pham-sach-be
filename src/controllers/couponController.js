const Coupon = require('../models/Coupon');
const Order = require('../models/Order');

// [GET] api/coupon
const read = async (req, res, next) => {
    try {
        let coupons;
        coupons = await Coupon.find();
        return res.status(200).json({ success: true, coupons });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [GET] api/coupon/get-by-customer/:customerId
const getByCustomer = async (req, res, next) => {
    const { customerId } = req.params;
    try {
        const coupons = await Coupon.find({ isActive: true });
        const couponsPromise = coupons.map(async (_) => {
            const coupon = _.toObject();
            if (!coupon.isOneTime) {
                return {
                    ...coupon,
                    canUse: true,
                };
            }
            const existOrder = await Order.findOne({ customer: customerId, coupon: coupon._id });
            if (!existOrder) {
                return {
                    ...coupon,
                    canUse: true,
                };
            } else {
                return {
                    ...coupon,
                    canUse: false,
                };
            }
        });

        const extraCoupons = await Promise.all(couponsPromise);
        return res.status(200).json({ success: true, coupons: extraCoupons });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [POST] api/coupon
const create = async (req, res, next) => {
    const { name, description, discountPercent, isActive, isOneTime } = req.body;

    // Validate field
    if (!name || !discountPercent || !description) {
        return res.status(400).json({ success: false, status: 400, message: 'Missed field' });
    }
    if (discountPercent <= 0 || discountPercent > 100) {
        return res
            .status(400)
            .json({ success: false, status: 400, message: 'Discount percent invalid' });
    }

    let coupon;
    coupon = await Coupon.findOne({ name });
    if (coupon) {
        return res
            .status(401)
            .json({ success: false, status: 401, message: 'name already exists' });
    }

    try {
        const newCoupon = new Coupon({
            name,
            description,
            discountPercent,
            isActive,
            isOneTime,
        });
        await newCoupon.save();
        return res.status(201).json({ success: true, coupon: newCoupon });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [GET] api/coupon/:id
const readOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        const coupon = await Coupon.findOne({ id });
        return res.status(200).json({ success: true, coupon });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [PUT] api/coupon/:id
const update = async (req, res, next) => {
    const id = Number(req.params.id);
    const bodyObj = req.body;
    const updateObj = {};

    Object.keys(bodyObj).forEach((key) => {
        if (bodyObj[key] !== undefined) {
            updateObj[key] = bodyObj[key];
        }
    });

    // Update coupon
    try {
        const newCoupon = await Coupon.findOneAndUpdate({ id }, updateObj, {
            new: true,
        });
        return res.status(200).json({ success: true, coupon: newCoupon });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [DELETE] api/coupon/:id
const destroy = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json({ success: false, status: 400, message: 'Missed id' });
    }

    try {
        await Coupon.delete({ id: req.params.id });
        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

module.exports = { read, create, readOne, update, destroy, getByCustomer };
