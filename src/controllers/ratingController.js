const Rating = require('../models/Rating');

// [GET] api/rating
const read = async (req, res, next) => {
    try {
        let ratings;
        ratings = await Rating.find();
        return res.status(200).json({ success: true, ratings });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [POST] api/rating
const create = async (req, res, next) => {
    const { product, customer, score, comment } = req.body;
    // Validate field
    if (!product || !customer || !score) {
        return res.status(400).json({ success: false, status: 400, message: 'Missed field' });
    }

    if (score < 1 || score > 5) {
        return res.status(400).json({ success: false, status: 400, message: 'Score invalid' });
    }

    // Check has rating
    const existRating = await Rating.findOne({ product, customer });
    if (existRating) {
        return res.status(400).json({ success: false, status: 400, message: 'Rating existed' });
    }

    try {
        const rating = new Rating({
            product,
            customer,
            score,
            comment,
        });
        await rating.save();
        return res.status(201).json({ success: true, rating });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [GET] api/rating/:id
const readOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        let rating;
        rating = await Rating.findOne({ id });

        return res.status(200).json({ success: true, rating });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [PUT] api/rating/:id
const update = async (req, res, next) => {
    const id = Number(req.params.id);
    const { score, comment } = req.body;

    const updateObj = {};
    if (score) {
        updateObj.score = score;
    }
    if (comment) {
        updateObj.comment = comment;
    }

    // Update rating
    try {
        const rating = await Rating.findOneAndUpdate({ id }, updateObj, {
            new: true,
        });

        return res.status(200).json({ success: true, rating });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [DELETE] api/rating/:id
const destroy = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json({ success: false, status: 400, message: 'Missed id' });
    }

    try {
        await Rating.delete({ id: req.params.id });
        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

module.exports = { read, create, readOne, update, destroy };
