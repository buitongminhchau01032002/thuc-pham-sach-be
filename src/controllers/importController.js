const Customer = require('../models/Customer');
const DetailImport = require('../models/DetailImport');
const Import = require('../models/Import');
const Product = require('../models/Product');

// [GET] api/import
const read = async (req, res, next) => {
    try {
        let imports;
        imports = await Import.find();
        return res.status(200).json({ success: true, imports });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// Create detail
const createDetail = ({ importObject, detailObjs }) => {
    const createDetailPromises = [];

    detailObjs.forEach((detailObj) => {
        const totalPrice = detailObj.importPrice * detailObj.quantity;
        const newDetailImport = new DetailImport({
            ...detailObj,
            import: importObject._id,
            totalPrice,
        });
        const savePromise = new Promise(async (resolve, reject) => {
            try {
                await newDetailImport.save();
                resolve(newDetailImport);
            } catch (error) {
                console.log(error);
                reject();
            }
        });
        createDetailPromises.push(savePromise);
    });

    return new Promise((resolve, reject) => {
        Promise.all(createDetailPromises)
            .then((newDetails) => resolve(newDetails))
            .catch(() => reject());
    });
};

const updateProductQuantity = (detailObjs) => {
    const updateQuantityPromises = [];

    detailObjs.forEach((detailObj) => {
        const updatePromise = new Promise(async (resolve, reject) => {
            try {
                const product = await Product.findById(detailObj.product);
                let newQuanity = product.toObject().quantity + detailObj.quantity;

                const newProduct = await Product.findOneAndUpdate(
                    { _id: detailObj.product },
                    { quantity: newQuanity },
                    {
                        new: true,
                    }
                );
                resolve(newProduct);
            } catch (error) {
                console.log(error);
                reject();
            }
        });

        updateQuantityPromises.push(updatePromise);
    });

    return new Promise((resolve, reject) => {
        Promise.all(updateQuantityPromises)
            .then((newProduct) => resolve(newProduct))
            .catch(() => reject());
    });
};

// [POST] api/import
const create = async (req, res, next) => {
    const { totalPrice, note, details } = req.body;

    // Validate field
    if (!totalPrice) {
        return res.status(400).json({ success: false, status: 400, message: 'Missed field' });
    }

    // Create import
    let newImport;
    try {
        newImport = new Import({
            totalPrice,
            note,
        });
        await newImport.save();
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }

    // Create detail import
    let newDetailImports;
    try {
        newDetailImports = await createDetail({ importObject: newImport, detailObjs: details });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }

    // update quantity
    try {
        await updateProductQuantity(details);
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }

    // Get import and response
    try {
        const updatedImport = await Import.findOne({ id: newImport.toObject().id });
        return res.status(200).json({
            success: true,
            imports: {
                ...updatedImport.toObject(),
                details: newDetailImports,
            },
        });
    } catch (error) {}
};

// [GET] api/import/:id
const readOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        let _import;
        _import = await Import.findOne({ id }).populate({
            path: 'details',
            populate: {
                path: 'product',
            },
        });
        // const details = await DetailImport.find({ import: _import.toObject()._id }).populate({
        //     path: 'product',
        //     populate: {
        //         path: 'product',
        //     },
        // });

        return res.status(200).json({ success: true, import: { ..._import.toObject() } });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [DELETE] api/import/:id
const destroy = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json({ success: false, status: 400, message: 'Missed id' });
    }

    try {
        await Import.delete({ id: req.params.id });
        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

module.exports = { read, create, readOne, destroy };
