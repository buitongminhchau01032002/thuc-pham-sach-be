const DetailImport = require('../models/DetailImport');

// [GET] api/detailImport
const read = async (req, res, next) => {
    try {
        let detailImports;
        detailImports = await DetailImport.find().populate('product');
        return res.status(200).json({ success: true, detailImports });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

module.exports = { read };
