const PromotionProgram = require('../models/PromotionProgram');

// [GET] api/promotionProgram
const read = async (req, res, next) => {
    try {
        let promotionPrograms;
        promotionPrograms = await PromotionProgram.find();
        return res.status(200).json({ success: true, promotionPrograms });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [POST] api/promotionProgram
const create = async (req, res, next) => {
    try {
        const newPromotionProgram = new PromotionProgram(req.body);
        await newPromotionProgram.save();
        return res.status(201).json({ success: true, promotionProgram: newPromotionProgram });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [GET] api/promotionProgram/:id
const readOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        let promotionProgram;
        promotionProgram = await PromotionProgram.findOne({ id });
        return res.status(200).json({ success: true, promotionProgram });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [PUT] api/promotionProgram/:id
const update = async (req, res, next) => {
    const id = Number(req.params.id);
    const bodyObj = req.body;
    const updateObj = {};

    Object.keys(bodyObj).forEach((key) => {
        if (bodyObj[key] !== undefined) {
            updateObj[key] = bodyObj[key];
        }
    });

    // Update promotionProgram
    try {
        const newPromotionProgram = await PromotionProgram.findOneAndUpdate({ id }, updateObj, {
            new: true,
        });
        return res.status(200).json({ success: true, promotionProgram: newPromotionProgram });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [DELETE] api/promotionProgram/:id
const destroy = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json({ success: false, status: 400, message: 'Missed id' });
    }

    try {
        await PromotionProgram.delete({ id: req.params.id });
        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

module.exports = { read, create, readOne, update, destroy };
