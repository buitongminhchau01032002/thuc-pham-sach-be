const Product = require('../models/Product');

// [GET] api/product
const read = async (req, res, next) => {
    try {
        const products = await Product.find().populate('type');
        return res.status(200).json({ success: true, products });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [POST] api/product
const create = async (req, res, next) => {
    const { name, description, importPrice, price, type, images, status } = req.body;
    // Validate field
    if (!name || !description || !importPrice || !price || !type || !images) {
        return res.status(400).json({ success: false, status: 400, message: 'Missed field' });
    }

    try {
        const newProduct = new Product({
            name,
            description,
            importPrice,
            price,
            type,
            images,
            status,
        });
        await newProduct.save();

        return res.status(201).json({ success: true, product: newProduct });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [GET] api/product/:id
const readOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        const product = await Product.findOne({ id }).populate('type');
        return res.status(200).json({ success: true, product });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [PUT] api/product/:id
const update = async (req, res, next) => {
    const id = Number(req.params.id);
    const bodyObj = req.body;
    const updateObj = {};

    Object.keys(bodyObj).forEach((key) => {
        if (bodyObj[key] !== undefined) {
            updateObj[key] = bodyObj[key];
        }
    });

    // Update product
    try {
        const newProduct = await Product.findOneAndUpdate({ id }, updateObj, {
            new: true,
        });
        return res.status(200).json({ success: true, product: newProduct });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [DELETE] api/product/:id
const destroy = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json({ success: false, status: 400, message: 'Missed id' });
    }

    try {
        await Product.delete({ id: req.params.id });
        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

module.exports = { read, create, readOne, update, destroy };
